# format-convert：转换原文到 Markdown / Word / PDF

> 来源：`../routine/专业文档：转换原文到Markdown、Word、PDF.txt`
> 触发：把已有文档转换成目标格式。
> 工具：`convert_docs_to_markdown`、`edit_file`（见 `../tools.md`）。

## 要求

1. **如果用户提及了明确的文档，或者工作空间有文档**：请将其转换成用户需要的格式。
2. **否则提示用户至少输入以下信息**（用 `talk_to_user`）：
   1. 通过工作空间上传文档；
   2. 给出目标文档格式类型（其中 markdown、word、pdf 会自动生成，latex 手稿可以手工生成），其他格式需要调用代码生成；
   3. 如果有多个文档，需要指定转换的文档范围（可以是全部）。
3. **如果用户上传了不支持的文档类型**（如 `.doc`），请提示用户转换为我们支持的类型，例如将 DOC 文档另存为 DOCX 再上传。

## md → Word（omp 环境优先路径）

彩文平台工具（`merge_file` / `convert_docs_to_markdown`）在 omp 中不存在时，用本 skill 自带的 node 工具：

```bash
node <skill目录>/tools/md2docx.js 输入.md                 # 套 tools/word_reference.docx 中文模板
node <skill目录>/tools/md2docx.js 输入.md -o 输出.docx --toc --title "题目" --author "作者" --date "日期"
```

依赖系统 pandoc；自动完成公式分隔符归一、去水平线、网络图片下载与 media 数校验（详见 `../SKILL.md` §3 与 §3.1 坑清单）。

> 支持格式参考：`convert_docs_to_markdown` 支持 `.docx` `.xlsx` `.html` `.tex` `.rst` `.pptx` `.pdf`；输出 .md 后保存/合并 markdown 会自动生成同名 Word 与 PDF。
