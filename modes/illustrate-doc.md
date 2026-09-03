# illustrate-doc：给文档配图（混合图源）⭐推荐

> 来源：`../routine/(🚀推荐) 彩文：给文档配图.txt`
> 触发：为已有分章节文档补充尽可能多的图像。
> 通用规范：SKILL.md §2 图表绘制规范适用。工具：`merge_file`、`search_img`、`convert_docs_to_markdown`（见 `../tools.md`）。

## 要求

1. 给各个文档（**数字开头的文档，除去最后的合并的总文档**）加入尽可能多的图像，图像可以从网上检索，示意图采用 SVG 绘制或 mermaid 绘制，也可以包括一些代码产生的数据结果透视图。**需结合文本内容进行配图。**
2. 配的图要位于 `images/` 文件夹下，可以通过修改 markdown 直接绘制。
3. 配置好各个文档图像后，**重新合并文档**（`merge_file`）。
4. **要求：至少使用 mermaid 绘制一张图，使用 SVG 绘制至少一张图。**
5. 请将用户的已有文档转为 markdown 格式（`convert_docs_to_markdown`），或生成新的 markdown 文件，在这个 markdown 文件中绘图。
