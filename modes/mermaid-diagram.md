# mermaid-diagram：绘制矢量逻辑图（思维导图/时序图/架构图/流程图等）

> 来源：`../routine/彩图：绘制矢量逻辑图（思维导图+时序图+架构图+流程图等）.txt`
> 触发：在文档中加入 mermaid 逻辑图。
> 通用规范：SKILL.md §2.2（mermaid 用 LR、丰富图型、限 5 色）。工具：`edit_file` / `convert_docs_to_markdown`、`talk_to_user`（见 `../tools.md`）。

## 要求

1. 给文档中加入 mermaid 图，按照 markdown 中加入 mermaid 图的格式书写，可以是思维导图、时序图、架构图、流程图、甘特图等 Mermaid 支持的图。
2. 配的图要位于 `images/` 文件夹下。
3. **要求：至少使用 mermaid 绘制三张图。**
4. 请将用户的已有文档转为 markdown 格式，或生成新的 markdown 文件，在这个 markdown 文件中绘图。
5. 如果用户没有指定文档数量，则尽量写入多个文档，每个文档一个图。

## 停止条件

- 如果用户没有说清楚要什么图，请停止任务，给出可选的图片类型，并让用户说清图片类型（`talk_to_user`）。
