import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './components/NotFound.vue'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'
import './style.css'

export default {
  extends: DefaultTheme,
  // 站点是中文的，默认主题 404 是英文占位页；用品牌样式的中文 404 顶掉
  Layout: () => h(DefaultTheme.Layout, null, { 'not-found': () => h(NotFound) })
}
