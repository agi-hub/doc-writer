#!/usr/bin/env node
// md2docx.js — Markdown 转 Word（doc-writer skill 自带，node 实现，无需 python）
//
// 移植自 paper2doc tools/md2docx.py（https://github.com/agi-hub/paper2doc），
// 适配 omp/无 python 环境；默认套用同目录 word_reference.docx 模板
// （中文 Word 习惯样式：黑体标题 styleId 2/3/4、宋体正文——pandoc 按样式名匹配，直接生效）。
//
// 预处理（与 md2docx.py 一致）：
//   - 公式分隔符规范化：\[..\] -> $$..$$，\(..\) -> $..$
//   - 移除 Markdown 水平分隔线（Word 中不需要）
//   - http(s) 图片自动下载到 <md目录>/assets_md2docx/ 并改写为相对引用
//   - 本地图片存在性校验
//
// 用法：
//   node md2docx.js article.md                          # 输出 article.docx（套模板）
//   node md2docx.js article.md -o 报告.docx
//   node md2docx.js article.md --reference none          # 不套模板（pandoc 默认样式）
//   node md2docx.js article.md --reference my.docx       # 指定其他模板
//   node md2docx.js report.md --toc --title "报告题目" --author "课题组" --date "2026-09"
// 依赖：系统 pandoc；node >= 18（内置 fetch）。

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

async function main() {
  const args = process.argv.slice(2);
  const input = args[0];
  if (!input || input.startsWith('-')) {
    console.error('用法: node md2docx.js <in.md> [-o out.docx] [--reference <docx|none>] [--toc] [--title S] [--subtitle S] [--author S] [--date S]');
    process.exit(1);
  }
  const opt = (name, fallback) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : fallback;
  };
  const has = (name) => args.includes(name);

  const mdPath = path.resolve(input);
  if (!fs.existsSync(mdPath)) { console.error(`文件不存在: ${mdPath}`); process.exit(1); }
  const mdDir = path.dirname(mdPath);
  const outPath = path.resolve(opt('-o', mdPath.replace(/\.md$/i, '.docx')));
  const ASSET = 'assets_md2docx';

  // ---------- 预处理 ----------
  let md = fs.readFileSync(mdPath, 'utf8');
  md = md
    .replace(/\\\[([\s\S]+?)\\\]/g, (_, x) => `\n\n$$${x}$$\n\n`)
    .replace(/\\\(([\s\S]+?)\\\)/g, (_, x) => `$${x}$`);
  md = md.replace(/^[\t ]*(?:---+|\*\*\*+|___+)[\t ]*$/gm, '');

  // 网络图片下载 + 本地图片校验
  const imgRefs = [...md.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
  let net = 0, missing = 0;
  for (const [, , src] of imgRefs) {
    if (/^https?:\/\//.test(src)) {
      const name = (src.replace(/[?#].*$/, '').split('/').pop() || 'img').slice(0, 120);
      const dest = path.join(mdDir, ASSET, name);
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        try {
          const res = await fetch(src);
          if (!res.ok) throw new Error(res.status);
          fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        } catch (e) { console.error(`  [警告] 图片下载失败: ${src} (${e.message})`); continue; }
      }
      md = md.split(`(${src})`).join(`(${ASSET}/${name})`);
      net++;
    } else if (!fs.existsSync(path.join(mdDir, src))) {
      console.error(`  [警告] 本地图片不存在: ${src}`);
      missing++;
    }
  }

  const tmpMd = path.join(mdDir, '.md2docx-tmp.md');
  fs.writeFileSync(tmpMd, md);

  // ---------- pandoc ----------
  let ref = opt('--reference', path.join(__dirname, 'word_reference.docx'));
  if (ref.toLowerCase() === 'none') ref = null;
  else if (!fs.existsSync(ref)) { console.error(`  [提示] 参考模板不存在: ${ref}，使用 pandoc 默认样式`); ref = null; }

  const cmd = ['pandoc', tmpMd, '-o', outPath,
    '--from', 'markdown+hard_line_breaks', '--to', 'docx', `--resource-path=${mdDir}`];
  if (ref) cmd.push('--reference-doc', ref);
  if (has('--toc')) cmd.push('--toc', '--toc-depth=2');
  for (const k of ['title', 'subtitle', 'author', 'date']) {
    const v = opt(`--${k}`, null);
    if (v != null) cmd.push('-M', `${k}=${v}`);
  }
  try {
    execFileSync(cmd[0], cmd.slice(1), { stdio: ['ignore', 'inherit', 'inherit'] });
  } finally { fs.rmSync(tmpMd, { force: true }); }

  // ---------- 校验（SKILL.md §4：media 数与图片引用数一致） ----------
  // docx 是 zip：本地文件头中的文件名明文可见，按字节扫描即可，无需解压库
  let mediaN = -1;
  try {
    const s = fs.readFileSync(outPath).toString('latin1');
    // 每个条目名在 zip 本地头+中央目录头各出现一次，除 2
    mediaN = Math.round((s.match(/word\/media\//g) || []).length / 2);
  } catch { /* ignore */ }
  const total = imgRefs.length;
  console.log(`输出: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  console.log(`图片: 引用 ${total} 处（下载 ${net}，缺失 ${missing}）| docx media 条目 ≈ ${mediaN}${total && mediaN !== total ? '  [警告] 与引用数不一致' : ' ✓'}`);
  if (missing) process.exit(2);
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
