---
name: doc-writer
description: "彩文/专业文档：图文写作与生成技能。覆盖 4 大模块 23 个功能（每个功能一个独立文件）——深度图文报告（完整/单章节）、学术论文（中文期刊综述）、专利交底书、国家项目申请书、标书技术方案、图文博客/公众号/小红书、富图片文章、富图像网页、翻译生成新文档、格式转换（Markdown/Word/PDF）、降低AIGC拟人化改写、配图绘图（SVG/mermaid/数据可视化/代码生图/AI生图/网搜图像）、文档合并，以及引用/数据/图表真实性审核。Triggers: 图文报告, 撰写报告, 写报告, 专业文档, 彩文, 专利交底书, 学术论文, 综述, 项目申请书, 标书, 投标, 博客, 公众号, 小红书, 翻译文档, 格式转换, 降AIGC, 拟人化改写, 配图, 绘图, 数据可视化, 思维导图, 架构图, 流程图, 合并文档, 审查引用, 审查数据, 审查图表, write report, illustrated report, document generation, humanize AI text."
---

# 彩文 · 专业文档写作技能（doc-writer）

整合 colordoc 全部文档撰写生成提示词，**每个功能一个独立文件**：

```
doc-writer/
├── SKILL.md        # 本文件：模式路由 + 通用规范（§1–§2）
└── modes/          # 23 个功能文件（源：routine/ 下 23 个提示词，逐文件注明出处）
```

## 0. 模式路由

按用户需求选择功能文件执行；标注"§1 适用"的深度写作模式默认遵守第 1 节通用规范。

### 写作模式（8 个）

| 功能 | 文件 | 适用 |
|---|---|---|
| 完整深度图文报告 ⭐默认推荐 | `modes/full-report.md` | 完整报告，§1 全适用 |
| 单章节图文报告 | `modes/single-chapter.md` | 只写最重要的一个章节，§1 全适用 |
| 学术论文（中文期刊·综述） | `modes/academic-paper.md` | 期刊综述论文，§1 适用 |
| 专利交底书 | `modes/patent-disclosure.md` | 专利交底，§1 适用 |
| 国家项目申请书 | `modes/grant-proposal.md` | 项目申请书，§1 适用 |
| 标书技术方案 | `modes/bid-document.md` | 投标技术方案，§1 适用 |
| 图文博客/公众号/小红书 | `modes/social-article.md` | 平台小文章，**不走 §1.2 学术风** |
| 富图片文章 | `modes/image-rich-article.md` | 图为主角的文章，§1 适用 |

### 转换与改写模式（4 个）

| 功能 | 文件 | 适用 |
|---|---|---|
| 翻译原文生成新文档 | `modes/translate.md` | 严格保留结构，不译参考文献 |
| 转换到 Markdown/Word/PDF | `modes/format-convert.md` | 格式转换 |
| 降低AIGC率、拟人化改写 | `modes/humanize.md` | **与 §1.2 行文规范相反**，以其自身规则为准 |
| 富图像网页 | `modes/rich-webpage.md` | HTML 网页输出 |

### 配图模式（7 个）

| 功能 | 文件 | 适用 |
|---|---|---|
| 给文档配图（混合图源）⭐推荐 | `modes/illustrate-doc.md` | 网图+SVG+mermaid+数据图 |
| 通过AI生图润色文档 | `modes/ai-image-polish.md` | 仅 `create_img` 自然图像 |
| 通过网络搜索图像润色文档 | `modes/web-image-polish.md` | 仅网搜图像 |
| 绘制数据可视化图 | `modes/data-viz.md` | matplotlib/plotly/SVG 图表 |
| 基于用户数据代码绘图 | `modes/code-plot.md` | 解析数据→写代码生图 |
| 绘制矢量示意图（SVG） | `modes/svg-diagram.md` | ≥3 张 SVG |
| 绘制矢量逻辑图 | `modes/mermaid-diagram.md` | ≥3 张 mermaid |

### 流程与质检模式（4 个）

| 功能 | 文件 | 适用 |
|---|---|---|
| 合并文档 | `modes/merge-docs.md` | 缺章节先补写再合并 |
| 审查引用真实性 | `modes/audit-citations.md` | data.csv 核验引用链接 |
| 审查文档数据真实性 | `modes/audit-doc-data.md` | data.csv 核验正文数据 |
| 审查图表数据真实性 | `modes/audit-chart-data.md` | data.csv 核验图表（改图表源文件） |

## 1. 通用写作规范（§1.1–§1.5）

> 深度图文写作模式（full-report / single-chapter / academic-paper / patent-disclosure / grant-proposal / bid-document / image-rich-article）默认适用；social-article 与 humanize 有意反其道，以各自文件为准。

### 1.1 结构与文件组织
- 先拟大纲，再逐节生成：一次只写一节，**不要一次性生成全部内容**。
- 每个章节写入独立 `.md` 文件（数字开头命名，如 `01-introduction.md`），最后用 `merge_file` 工具合并成完整文档；**不要自行合并成很大的 md**。合并完成后不再向报告追加内容。
- 章节文档放在工作目录根目录，**不要建立子文件夹**（配图模块生成的图像放 `images/` 文件夹除外）。
- 同一文档的完全替换（fully replace）编辑不超过两次。

### 1.2 段落与行文
- 论述详细，尽量使用长句，单个段落 300 字上下（不低于 5–8 句）。
- 用"在xxx方面""从一方面、另一方面""首先、其次、再次、最后""第一、第二"等承接词衔接子观点，**代替分条列出子观点的格式**；承接词要丰富，相邻段落必须使用不同的承接词。
- 多用"比如""举例"等方式解释观点；段落采用总分或总分总结构。
- 用过渡词、过渡句衔接句子，也可通过指代词和关键词衔接各句。
- 正文用连续行文，避免过多 bullet 与枚举。

### 1.3 图文比例（图先行）
- 图文并茂。对每个章节，**先绘制足够多的图像，再补充文字内容**。
- 每章至少 1 张 SVG 图，适度加入 mermaid 图作为补充，风格尽量多样化；复杂图表（如系统架构图）优先用 SVG。
- 充分利用表格阐述数据或观点；建议多用数据类图表。
- 充分利用调研数据：可写程序分析数据并生成图像。
- 每张图后紧跟图题注释（图号自动生成，正文中不要另写图题）：

  ````markdown
  ```svg（或 ```mermaid）
  ...图...
  ```
  <!-- the_diagram_caption -->
  ````

### 1.4 数据与引用（硬性要求）
- **每个具体数字必须有可靠的引用来源，否则不写具体数字**（改为模糊化表述）。禁止凭记忆或臆测写出任何具体数值。
- 文末加"参考文献"一节总结数据来源，采用学术引用格式；学术论文用 GB/T 7714 格式。
- 完成后可用审核模式（`modes/audit-*.md`）核验引用与数据真实性。

### 1.5 调研
- 每个章节撰写前，搜索网页、知识库、代码库相关信息，按需求整理后再写。
- 网络连续搜索控制在 2 轮以内，之后综合已有信息或向用户要更具体的指引。

## 2. 图表绘制规范

### 2.1 SVG
- 文本框画大一些，确保文字放得下；避免文本框重叠、避免线条穿过文字；箭头画小。
- 文本中避免 `>`、`<`、`&` 等特殊字符。
- 中文用 `font-family="Noto Sans CJK SC, Arial"`；系统无 CJK 字体时改用英文文本，不要强设中文字体。
- 画线/曲线的 `<path>`（非填充形状）必须显式 `fill='none'`，防止黑色背景。

### 2.2 Mermaid
- 方向用 **LR**，不要用 TD/TB。
- 鼓励丰富图型：Flowchart、Class、Quadrant、Radar、Sankey、Timeline、Mindmap、时序图、甘特图等。
- 用 style 上色，限最多 5 种颜色。

### 2.3 数据图（matplotlib/plotly 等）
- 图像输出到 `images/` 文件夹。
- 坐标轴标签默认英文；需要中文时先用 `matplotlib.font_manager.findfont`（或 `fc-list`）确认 CJK 字体可用（如 'Noto Sans CJK JP'、'WenQuanYi Micro Hei'），无可用 CJK 字体则退回英文标签；**禁止**把 'DejaVu Sans' 用于中文。
- 按数据特点选图：趋势→折线图，分类对比→柱状图，占比→饼图。
- 收到字体告警（中文回退字体）必须先解决再收尾。


### 2.4 原文档自带的图像
- 对于素材文档具有的图像，可以先拷贝原图到工作区，并将当前的路径引用到正文，对于有价值的图像（和文档有关联的），建议引用过来

# 3. 转换文档
- 默认采用Markdown书写
- 编辑完成后，请通过pandoc转换文档到word或pdf


## 4. 典型端到端流程

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

