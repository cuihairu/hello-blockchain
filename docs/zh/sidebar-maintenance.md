# 站点导航维护

站点侧栏由 [`docs/.vitepress/sidebar.json`](.vitepress/sidebar.json) 唯一维护，VitePress 配置直接导入该文件。`docs/SUMMARY.md` 是 mdBook 时代遗留文件，仅保留导航维护说明，不再作为手写目录副本。

新增、移除或调整站点页面时，更新 `sidebar.json`，并运行 `npm run docs:check`：它会核对侧栏路由是否存在、页面是否进入侧栏、站内链接是否有效，以及 README 目录树和声明数字是否与实际内容一致。不要把 `SUMMARY.md` 当作第二份导航编辑；若兼容工具需要目录，应从 `sidebar.json` 派生。

侧栏分组标题若与组内首个页面相同，应只保留子项上的路由链接，避免同一路由在同一侧栏出现两次。跨组复用路由仍可按内容发现需求保留。
