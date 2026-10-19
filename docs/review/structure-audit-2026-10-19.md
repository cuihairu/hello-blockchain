# hello-blockchain 目录与内容组织审计（2026-10-19）

范围：只读核查仓库当前内容；本次仅新增本报告，不改文档、导航配置或构建产物。行数按 Markdown 文件换行拆分统计；目录表排除生成目录 `docs/.vitepress/dist`，但将保留的 `docs/SUMMARY.md` 计入。`docs:check` 统计 141 个可发布页面（不含 SUMMARY）；目录表共 142 个 Markdown（含 SUMMARY）。

## 量化事实

### docs/ 一级目录 Markdown 数量与行数

| 一级目录 | .md 数 | 总行数 | 说明 |
|---|---:|---:|---|
| (根目录) | 6 | 923 | 含 `SUMMARY.md`；其余为首页、简介、总纲与两条时间线 |
| Privacy | 10 | 860 | 目录名首字母大写 |
| algo | 1 | 86 | |
| btc | 2 | 121 | |
| cards | 2 | 234 | |
| chain-games | 2 | 127 | |
| chains | 27 | 1,157 | |
| consensus | 53 | 1,938 | 最大主题目录 |
| consortium | 6 | 227 | |
| dapp | 1 | 136 | |
| dcny | 2 | 97 | |
| hacking | 14 | 755 | |
| layers | 5 | 344 | |
| model | 4 | 371 | |
| nav | 2 | 102 | |
| nft | 3 | 358 | |
| opcode | 1 | 52 | |
| trends | 1 | 137 | |
| **合计** | **142** | **8,085** | 141 个发布页面 + 1 个遗留 SUMMARY |

`.vitepress`、`public`、`img` 是配置/静态资源目录，本身没有 Markdown 内容；生成站点目录 `.vitepress/dist` 当前有 503 个文件，被 `.gitignore` 忽略，不应计作源文档。

### 并行组织轴

按读者找内容时实际遇到的分类/入口归为 **5 套并行组织方式**（包含主题归档、专题/历史页、导航索引与仓库维护入口）：

| 目录名/载体 | 条目数 | 命名规律 | 有无编号 | 编号连续性 |
|---|---:|---|---|---|
| 主题目录：`consensus`、`chains`、`hacking` 等 16 个内容目录 | 134 篇 | 目录按主题；文件多为 PascalCase 英文主题名，少量缩写全大写 | 否 | 不适用 |
| `docs/` 根目录专题页 | 5 篇 | `Introduction`、`index`、`knowledge`、`timeline`、`consensus-timeline`，同时有标题式与小写 kebab-case | 否 | 不适用 |
| 导航/入口映射：`nav/`、`.vitepress/sidebar.json`、`SUMMARY.md` | `nav/` 2 页；sidebar 153 条配置项（140 个唯一链接）；SUMMARY 151 个 Markdown 链接 | 人工编排；sidebar 是站点侧栏，SUMMARY 是 mdbook 遗留映射底稿 | 否 | 不适用 |
| 历史/时间线：根目录 2 页 + `nav/ByTime.md` + `.vitepress/theme/data/timeline.ts` | 3 个入口页 + 1 份数据源 | 按时间/年份组织，含区块链发展史和共识演进两条口径 | 有年份但无章节序号 | 年份是历史数据，非连续编号 |
| 仓库说明/维护入口：仓库根 `README.md`、`README.zh.md`、`todo.md` | 3 个 Markdown | README 英/中文双份；todo 是维护清单 | 无连续编号体系 | 不适用 |

项目没有单独的 `API/` 或 `guides/` 文档目录；不要将其误判为两套缺失的分类。

## 问题清单与严重度

### 1. 编号断档、跳号或重复：未发现章节编号问题（低）

对 142 个 docs Markdown 文件名抽取数字开头项并排序，仅得到 `docs/hacking/51Attack.md`。这是“51% 攻击”的主题命名，不是章节编号；因此没有 01/02 序列可供检查，也没有断档、跳号或重复编号。`docs/consensus-timeline.md` 中的年份及 `docs/timeline.md` 的 49 个节点同样不是编号章节。证据：`docs/hacking/51Attack.md`、`docs/timeline.md`、`docs/consensus-timeline.md`。

### 2. 跨入口的时间线主题重叠（中）

区块链通史和共识算法史分别有独立页面，但“按时间”入口又提供第三种发现路径：`docs/timeline.md`、`docs/consensus-timeline.md`、`docs/nav/ByTime.md`；通史数据另在 `docs/.vitepress/theme/data/timeline.ts`。两条时间线互相交叉引用，内容边界当前可解释（通史 vs 共识史），真正的维护成本是三处入口/不同呈现方式，不宜直接合并内容。证据：上述四个路径；`docs/timeline.md` 指向共识时间线，`docs/consensus-timeline.md` 也指向发展史时间线。

### 3. 主题边界不是完全互斥（中）

“链/共识/攻击/资产”按内容类型分目录，但交叉主题仍分散：链项目页在 `docs/chains/`，其共识细节在 `docs/consensus/`，相关攻击又在 `docs/hacking/`；例如 `docs/consensus-timeline.md` 同时链接 `docs/chains/Bitcoin.md` 与 `docs/hacking/LightningNetworkAttack.md`。这属于百科主题天然交叉，当前通过站内链接连接且检查通过；若没有主题归属规则，新内容容易重复落点。证据：`docs/chains/Chain.md`、`docs/consensus/Consensus.md`、`docs/hacking/Attack.md`、`docs/consensus-timeline.md`。

### 4. 文件/目录命名风格不统一（低）

目录大小写并存：`docs/Privacy/` 与 `docs/consensus/`、`docs/chains/` 等小写；文件风格也并存：全大写缩写 `docs/consensus/POW.md`、混合缩写 `docs/consensus/PoET.md`、复合 PascalCase `docs/consensus/MultiLevelBFT.md`，以及小写 kebab-case 根页 `docs/consensus-timeline.md`。这是检索与跨平台大小写敏感风险，但当前路径能被侧栏和内部链接解析。证据：所列路径、`docs/.vitepress/sidebar.json`。

### 5. 侧边栏对账：未发现文件差异（低）

读取 `docs/.vitepress/config.mts`：sidebar 从 `.vitepress/sidebar.json` 导入；配置注释说明需与 `docs/SUMMARY.md` 对齐。运行 `npm run docs:check` 得到 `check-nav: ok (141 pages, 153 sidebar links)`。独立按唯一链接对账：页面存在但未进 sidebar **0 条**；sidebar 配置但目标文件不存在 **0 条**。因此两组“前 10 条”均为空：

| 对账组 | 数量 | 前 10 条 |
|---|---:|---|
| 配置了但文件不存在 | 0 | 无 |
| 文件存在但没进侧边栏 | 0 | 无（首页 `/` 按脚本约定不要求进侧栏） |

证据：`docs/.vitepress/config.mts`、`docs/.vitepress/sidebar.json`、`docs/SUMMARY.md`、`scripts/check-nav.mjs`。

### 6. 死链：此次检查未发现（低）

运行 `npm run docs:check`，脚本检查 Markdown 内部路径与锚点，结果通过；运行 `npm run docs:links -- --timeout 5000 --concurrency 12`，151 个唯一外链全部可达。故本次核查未发现死链。外部网站状态随时间变化；构建未运行，因为 `docs:build` 会先重写受版本控制的 `.vitepress/backlinks.json`，本任务限定只新增报告。证据：`package.json` scripts、`scripts/check-nav.mjs`、`scripts/check-links.mjs`、`docs/.vitepress/config.mts`。

### 7. 根目录 Markdown 杂项与生成文件（低）

仓库根有 `README.md`、`README.zh.md`、`todo.md` 三个非 docs Markdown；前两者是不同语言版本，不是重复副本，不建议删除。`todo.md` 是项目维护清单，定位比 README 模糊。`docs/.vitepress/dist` 有 503 个生成文件，但由 `.gitignore` 忽略且不属于源码；不是待迁移的文档。未见其他临时 Markdown 文件。证据：仓库根 `README.md`、`README.zh.md`、`todo.md`；`.gitignore`；`docs/.vitepress/dist/`。

## 判断与推荐

### 该收敛到几套

当前可辨认出 **5 套组织轴**。建议收敛到 **3 套**，保留现有主题目录为唯一的内容归档轴；保留一个受检查器约束的站点导航/目录映射轴；将时间线、索引、首页视作主题内容的入口页，不再让它们形成平行分类。具体是明确“每篇内容的唯一归属目录 + 交叉链接”的规则、把时间线页与时间索引的职责写清楚、让新内容仍走主题目录并由侧栏/SUMMARY 显式纳入。

不建议把全部主题目录并为一个大目录，也不建议删除独立的两条时间线：`consensus`、`chains` 等已有清晰主题边界，时间线的通史和算法史关注点不同。路径大小写统一和页面合并涉及外链/搜索旧 URL，应分期处理。

### 其实不乱、不用动的部分

- `docs/consensus/`、`docs/chains/`、`docs/hacking/` 等主题目录结构能按内容类型定位，且共识主题集中度最高（53 篇）；无需为视觉整齐而拆分或重排。
- 侧栏、SUMMARY 与源页面对账通过，当前 141 个页面无遗漏；不需要全量重建侧栏。
- 两条时间线分别描述发展史和共识算法史，存在交叉链接而非重复文章，保留两页合理。
- `README.md` 与 `README.zh.md` 是双语入口，不是内容重复；应保留。
- `51Attack.md` 中的 `51` 是概念名，不是数字章节号；不应改名来“补连续编号”。
- `.vitepress/dist` 是忽略的构建产物，不是内容目录问题。

## 三期收口方案

| 阶段 | 动作清单 | 影响范围 | 风险：链接/搜索/外链 | 用户拍板 |
|---|---|---|---|---|
| 一期：机械整理（目标 1 小时内，不改现存链接） | 写一页目录约定：主题目录为唯一归档；新文章采用统一目录小写、文件名 PascalCase 的规则；在仓库说明中标注 `todo.md` 用途；将两个时间线及 `nav/ByTime` 的职责说明放到文档入口。只做约定/注释，不改 URL 与 sidebar 条目。 | `README.md`、`README.zh.md`、维护约定、目录说明 | 低；不改路径，搜索与外链不变 | `todo.md` 是个人清单还是项目维护清单，需拍板后决定放置/说明方式 |
| 二期：导航与兼容（改 sidebar 与重定向） | 确定 canonical URL 和大小写规范；修正少量命名并增加旧路径重定向；将 `nav/ByTime` 明确标为索引或从侧栏降级；更新 sidebar、SUMMARY、内部链接与检查器约束，跑构建/链接检查。 | 被选中的文档路径、`docs/.vitepress/sidebar.json`、`docs/SUMMARY.md`、VitePress 重定向配置、相关脚本 | 中；旧站内链接可统一替换，但搜索缓存和外站直链会受影响，必须保留重定向 | 具体哪些文件改 URL、旧 URL 保留多久、`nav/ByTime` 是否留侧栏，必须拍板 |
| 三期：内容深度重构 | 对时间线与知识总纲做段落级去重；设立主题归属表，决定跨主题页面的唯一主目录；评估是否拆分/合并弱主题小目录（如单篇 `algo`、`opcode`）；同步重写导航、SUMMARY、交叉引用与介绍文案。 | `docs/` 大范围内容与导航，可能触及 141 页面 | 高；页面合并/改名影响搜索索引、外链与锚点，需映射/重定向及发布后抽查 | 合并哪些文章/目录、保留哪些主题入口与外链兼容周期，全部必须拍板 |

“一期 1 小时”是约束目标：限定为约定和说明，不包括逐页改名或深度编辑；若要求新增多份说明并双语同步，工时需重新估算。

## 最该先做的三件事

1. 保持现有主题目录和页面 URL，先发布一条明确的内容归属/命名规则，防止新内容继续扩大风格差异。
2. 给 `docs/timeline.md`、`docs/consensus-timeline.md`、`docs/nav/ByTime.md` 写清职责，确认第三个入口是索引还是重复导航。
3. 将 `npm run docs:check` 与 `npm run docs:links` 作为每次导航改动的门槛；目前检查全通过，不做无必要的大规模搬迁。

## 执行收口：跨轴内容核对（2026-10-19）

### 真重复：导航页复述时间线规模数字（1 组，已收敛）

- 对比证据：收口前 `docs/nav/ByTime.md:3` 把共识时间线写为「63 条年表」、发展史时间线写为「46 个节点」；权威页 `docs/consensus-timeline.md` 的时间线总表实际为 64 条，`docs/timeline.md:11` 则明确为 49 个节点。数字由导航页另行抄写，已发生漂移。
- 处理：ByTime 不再复述两个可变规模数字或正文细节，只摘要两个页面各自的视角并链接权威页。链首次主网上线排序与条目边界说明留在 ByTime。

### 不同角度：两条时间线与按上线时间导航（1 组，保留互链）

- 对比证据：`docs/timeline.md:11` 按事件先后解释「为什么是这个时候」；`docs/consensus-timeline.md:7` 按算法年份整理来源、机制与采用者；`docs/nav/ByTime.md:3` 按链首次主网上线时间排序并对照共识。主题交叉，但排序对象和回答的问题不同，不是同一份事实的重复抄写。
- 处理：保留三个既有页面和 URL；三页互相链接并在入口文案标明角度，不合并条目。
