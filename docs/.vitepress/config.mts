import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sidebarEn from './sidebar.en.json' with { type: 'json' }
import sidebarZh from './sidebar.zh.json' with { type: 'json' }

const SITE_URL = 'https://cuihairu.github.io/hello-blockchain'

// 反向链接数据由 scripts/build-backlinks.mjs 预计算（npm run docs:build 会先跑它）
const backlinks = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'backlinks.json'), 'utf-8')
)

// 站点是双语的：英文在根目录，简体中文在 /zh/。每个语言的侧栏分别来自
// sidebar.en.json / sidebar.zh.json，与各自的语言目录一一对应。
// 每套语言的 themeConfig 放在 locales.<key>.themeConfig 下：VitePress 会把
// 该条目深度合并到下面的全局 themeConfig 之上，所以只有随语言变化的部分
// （导航、侧栏、界面文案）需要按语言各写一份。
const enThemeConfig = {
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Introduction', link: '/Introduction' },
    { text: 'Ledger models', link: '/model/Models' },
    { text: 'Consensus algorithms', link: '/consensus/Consensus' },
    { text: 'Privacy and security', link: '/Privacy/Privacy' },
    { text: 'Attacks', link: '/hacking/Attack' },
    { text: 'Notable blockchains', link: '/chains/Chain' },
    { text: 'Navigation indexes', link: '/nav/ByConsensus' }
  ],
  sidebar: sidebarEn as never,
  outline: { label: 'On this page', level: [2, 3] },
  docFooter: { prev: 'Previous', next: 'Next' },
  lastUpdated: { text: 'Last updated' },
  returnToTopLabel: 'Go to top',
  sidebarMenuLabel: 'Menu',
  darkModeSwitchLabel: 'Appearance',
  lightModeSwitchTitle: 'Switch to light mode',
  darkModeSwitchTitle: 'Switch to dark mode'
}

const zhThemeConfig = {
  nav: [
    { text: '首页', link: '/zh/' },
    { text: '简介', link: '/zh/Introduction' },
    { text: '记账模型', link: '/zh/model/Models' },
    { text: '共识算法', link: '/zh/consensus/Consensus' },
    { text: '隐私安全', link: '/zh/Privacy/Privacy' },
    { text: '黑客攻击', link: '/zh/hacking/Attack' },
    { text: '公链项目', link: '/zh/chains/Chain' },
    { text: '导航索引', link: '/zh/nav/ByConsensus' }
  ],
  sidebar: sidebarZh as never,
  outline: { label: '页面导航', level: [2, 3] },
  docFooter: { prev: '上一篇', next: '下一篇' },
  lastUpdated: { text: '最后更新' },
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式'
}

const EN_DESCRIPTION =
  'Blockchain knowledge base — ledger models, consensus algorithms, privacy techniques, attacks and defenses, the public-chain ecosystem and NFT issuance'
const ZH_DESCRIPTION =
  '区块链知识体系——记账模型、共识算法、隐私技术、攻击与防御、公链生态与 NFT 资产发行'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Hello Blockchain',
  description: EN_DESCRIPTION,
  base: '/hello-blockchain/',
  cleanUrls: true,
  lastUpdated: true,

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: EN_DESCRIPTION,
      themeConfig: enThemeConfig
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      description: ZH_DESCRIPTION,
      themeConfig: zhThemeConfig
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-blockchain/favicon.svg' }],
    ['meta', { property: 'og:site_name', content: 'Hello Blockchain' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ],

  // 每页的 og/twitter 标签在此按实际标题与描述生成（%t/%d 模板在此版本不可用）
  transformHead({ pageData, title, description }) {
    const zh = pageData.localeIndex === 'zh'
    const rel = pageData.relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '')
    const url = rel ? `${SITE_URL}/${rel}` : `${SITE_URL}/`
    return [
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:locale', content: zh ? 'zh_CN' : 'en_US' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: `${SITE_URL}/og-image.png` }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', {
        property: 'og:image:alt',
        content: zh ? 'Hello Blockchain 区块链知识体系' : 'Hello Blockchain — blockchain knowledge base'
      }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }]
    ]
  },

  // mdbook 遗留的目录文件保留在仓库作映射底稿，不作为页面构建
  srcExclude: ['**/SUMMARY.md'],

  // 部署在 GitHub Pages 子路径下，hostname 需带 base，生成的 sitemap 才指向线上真实地址
  sitemap: {
    hostname: 'https://cuihairu.github.io/hello-blockchain/',
    lastmodDateOnly: true
  },

  ignoreDeadLinks: false,

  markdown: {
    lineNumbers: false,
    math: true,
    // 每页底部自动追加「反向链接」（谁引用了我）：正文 markdown 链接走 VitePress
    // 的 link 规则渲染，base 前缀自动带上
    config(md) {
      md.core.ruler.push('inject-backlinks', (state) => {
        const rel = state.env?.relativePath
        if (!rel || !rel.endsWith('.md')) return
        let route = '/' + rel.slice(0, -3)
        if (route.endsWith('/index')) route = route.slice(0, -6) || '/'
        const list = backlinks.backlinks[route]
        if (!list || !list.length) return
        const zh = state.env?.localeIndex === 'zh'
        const mk = (type, tag, nesting) => new state.Token(type, tag, nesting)
        const txt = (content) => {
          const t = mk('text', '', 0)
          t.content = content
          return t
        }
        const heading = mk('heading_open', 'h2', 1)
        heading.markup = '##'
        const headingText = mk('inline', '', 0)
        headingText.children = [txt(zh ? '反向链接' : 'Backlinks')]
        const children = []
        list.forEach((b, i) => {
          if (i) children.push(txt(' · '))
          const open = mk('link_open', 'a', 1)
          open.attrs = [['href', b.r]]
          children.push(open, txt(b.t), mk('link_close', 'a', -1))
        })
        const inline = mk('inline', '', 0)
        inline.children = children
        state.tokens.push(
          heading,
          headingText,
          mk('heading_close', 'h2', -1),
          mk('paragraph_open', 'p', 1),
          inline,
          mk('paragraph_close', 'p', -1)
        )
      })
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Hello Blockchain',

    // sidebar.en.json / sidebar.zh.json 是各自语言站点导航的唯一真源；
    // SUMMARY.md 保留为维护说明；新增页面更新对应侧栏并运行 docs:check
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-blockchain' }
    ],

    footer: {
      message: 'Hello Blockchain',
      copyright: '© 2025-2026 cuihairu'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Search the docs', buttonAriaLabel: 'Search' },
          modal: {
            noResultsText: 'No results found.',
            resetButtonTitle: 'Clear the search query',
            footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' }
          }
        },
        locales: {
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    }
  }
})
