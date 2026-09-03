# doc-writer · 彩文 · 专业文档写作技能

> 一个面向 AI Agent 的图文写作与生成技能（Skill）。整合 colordoc 全部文档撰写生成提示词，覆盖 **4 大模块、23 个功能**，每个功能一个独立提示词文件，按需路由加载。

## 项目结构

```
doc-writer/
├── SKILL.md        # 模式路由 + 通用写作规范（§1–§4）
└── modes/          # 23 个功能文件，逐文件注明出处
```

## 功能总览

### 写作模式（8 个）

| 功能 | 文件 | 说明 |
|---|---|---|
| 完整深度图文报告 ⭐ 默认推荐 | [`modes/full-report.md`](modes/full-report.md) | 完整报告，通用规范全适用 |
| 单章节图文报告 | [`modes/single-chapter.md`](modes/single-chapter.md) | 只写最重要的一个章节 |
| 学术论文（中文期刊·综述） | [`modes/academic-paper.md`](modes/academic-paper.md) | 期刊综述，GB/T 7714 引用 |
| 专利交底书 | [`modes/patent-disclosure.md`](modes/patent-disclosure.md) | 专利交底 |
| 国家项目申请书 | [`modes/grant-proposal.md`](modes/grant-proposal.md) | 项目申请书 |
| 标书技术方案 | [`modes/bid-document.md`](modes/bid-document.md) | 投标技术方案 |
| 图文博客 / 公众号 / 小红书 | [`modes/social-article.md`](modes/social-article.md) | 平台小文章，不走学术风 |
| 富图片文章 | [`modes/image-rich-article.md`](modes/image-rich-article.md) | 图为主角的文章 |

### 转换与改写模式（4 个）

| 功能 | 文件 | 说明 |
|---|---|---|
| 翻译原文生成新文档 | [`modes/translate.md`](modes/translate.md) | 严格保留结构，不译参考文献 |
| 格式转换（Markdown/Word/PDF） | [`modes/format-convert.md`](modes/format-convert.md) | pandoc 转换 |
| 降低 AIGC 率、拟人化改写 | [`modes/humanize.md`](modes/humanize.md) | 与学术行文规范相反，以自身规则为准 |
| 富图像网页 | [`modes/rich-webpage.md`](modes/rich-webpage.md) | HTML 网页输出 |

### 配图模式（7 个）

| 功能 | 文件 | 说明 |
|---|---|---|
| 给文档配图（混合图源）⭐ 推荐 | [`modes/illustrate-doc.md`](modes/illustrate-doc.md) | 网图 + SVG + mermaid + 数据图 |
| AI 生图润色文档 | [`modes/ai-image-polish.md`](modes/ai-image-polish.md) | 自然图像生成 |
| 网搜图像润色文档 | [`modes/web-image-polish.md`](modes/web-image-polish.md) | 仅网络搜索图像 |
| 数据可视化图 | [`modes/data-viz.md`](modes/data-viz.md) | matplotlib / plotly / SVG |
| 基于用户数据代码绘图 | [`modes/code-plot.md`](modes/code-plot.md) | 解析数据 → 写代码生图 |
| 矢量示意图（SVG） | [`modes/svg-diagram.md`](modes/svg-diagram.md) | 架构图等复杂示意图 |
| 矢量逻辑图（mermaid） | [`modes/mermaid-diagram.md`](modes/mermaid-diagram.md) | 流程图、时序图、甘特图等 |

### 流程与质检模式（4 个）

| 功能 | 文件 | 说明 |
|---|---|---|
| 合并文档 | [`modes/merge-docs.md`](modes/merge-docs.md) | 缺章节先补写再合并 |
| 审查引用真实性 | [`modes/audit-citations.md`](modes/audit-citations.md) | data.csv 核验引用链接 |
| 审查文档数据真实性 | [`modes/audit-doc-data.md`](modes/audit-doc-data.md) | 核验正文数据 |
| 审查图表数据真实性 | [`modes/audit-chart-data.md`](modes/audit-chart-data.md) | 核验图表数据（可改图表源文件） |

## 核心设计

- **图文并茂，图先行**：每章先绘制足够多的图像（每章至少 1 张 SVG，辅以 mermaid 与数据图），再补文字。
- **数据可信硬约束**：每个具体数字必须有可靠引用来源，否则模糊化表述；文末附学术格式参考文献。
- **分章写作**：先拟大纲，一次只写一节，章节独立成文件后统一合并，避免一次性生成超长文档。
- **端到端质检**：写作完成后可用 `audit-*` 模式核验引用、正文数据与图表数据的真实性。

## 典型端到端流程

```mermaid
graph LR
    A[明确需求/选功能] --> B[调研: 网页/知识库/代码库]
    B --> C[拟大纲]
    C --> D[逐章写作: 先绘足图<br/>SVG+mermaid+数据图]
    D --> E[配图润色: illustrate-doc]
    E --> F[merge-docs 合并]
    F --> G[审核: 引用/数据/图表真实性]
    G --> H[自动生成 Word/PDF 交付]
```

## 使用方式

将本目录放入支持 Skill 机制的 Agent 工作区（如 `~/.claude/skills/doc-writer`），然后对 Agent 说：

- 「写一篇关于 XX 的深度图文报告」→ 路由到 `full-report.md`
- 「帮我把这篇文档降降 AIGC 味」→ 路由到 `humanize.md`
- 「给这份报告配图」→ 路由到 `illustrate-doc.md`
- 「审查这篇文章的引用是否真实」→ 路由到 `audit-citations.md`

完整触发词列表见 [`SKILL.md`](SKILL.md) 的 description 字段。
