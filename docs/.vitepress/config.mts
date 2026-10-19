import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sidebar from './sidebar.json' with { type: 'json' }

const SITE_URL = 'https://cuihairu.github.io/hello-blockchain'

// 反向链接数据由 scripts/build-backlinks.mjs 预计算（npm run docs:build 会先跑它）
const backlinks = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'backlinks.json'), 'utf-8')
)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Hello Blockchain',
  description: '区块链知识体系——记账模型、共识算法、隐私技术、攻击与防御、公链生态与 NFT 资产发行',
  base: '/hello-blockchain/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-blockchain/favicon.svg' }],
    ['meta', { property: 'og:site_name', content: 'Hello Blockchain' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ],

  // 每页的 og/twitter 标签在此按实际标题与描述生成（%t/%d 模板在此版本不可用）
  transformHead({ pageData, title, description }) {
    const rel = pageData.relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '')
    const url = rel ? `${SITE_URL}/${rel}` : `${SITE_URL}/`
    return [
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: `${SITE_URL}/og-image.png` }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: 'Hello Blockchain 区块链知识体系' }],
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
        const mk = (type, tag, nesting) => new state.Token(type, tag, nesting)
        const txt = (content) => {
          const t = mk('text', '', 0)
          t.content = content
          return t
        }
        const heading = mk('heading_open', 'h2', 1)
        heading.markup = '##'
        const headingText = mk('inline', '', 0)
        headingText.children = [txt('反向链接')]
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

    nav: [
      { text: '首页', link: '/' },
      { text: '简介', link: '/Introduction' },
      { text: '记账模型', link: '/model/Models' },
      { text: '共识算法', link: '/consensus/Consensus' },
      { text: '隐私安全', link: '/Privacy/Privacy' },
      { text: '黑客攻击', link: '/hacking/Attack' },
      { text: '公链项目', link: '/chains/Chain' },
      { text: '导航索引', link: '/nav/ByConsensus' }
    ],

    // sidebar.json 是站点导航唯一真源；SUMMARY.md 保留为维护说明；新增页面更新 sidebar 并运行 docs:check
    sidebar: sidebar as never,

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
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
