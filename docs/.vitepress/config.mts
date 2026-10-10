import { defineConfig } from 'vitepress'
import sidebar from './sidebar.json' with { type: 'json' }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Hello Blockchain',
  description: '区块链知识体系——记账模型、共识算法、隐私技术、攻击与防御、公链生态与 NFT 资产发行',
  base: '/hello-blockchain/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-blockchain/favicon.svg' }]
  ],

  // mdbook 遗留的目录文件保留在仓库作映射底稿，不作为页面构建
  srcExclude: ['**/SUMMARY.md'],

  ignoreDeadLinks: true,

  markdown: {
    lineNumbers: false,
    math: true
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
      { text: '公链项目', link: '/chains/Chain' }
    ],

    // sidebar.json 手工维护，结构与 docs/SUMMARY.md 对齐，新增页面需同步两处；npm run docs:check 校验
    sidebar: sidebar as never,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-blockchain' }
    ],

    footer: {
      message: 'Hello Blockchain',
      copyright: '© 2025 cuihairu'
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
