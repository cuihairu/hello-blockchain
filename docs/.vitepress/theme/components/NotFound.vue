<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

// 页面本身没有语言，跟随所在语言包（localeIndex: root = 英文, zh = 简体中文）
const { localeIndex } = useData()
const t = computed(() => localeIndex.value === 'zh' ? {
  title: '页面不存在',
  desc: '链接可能已失效，或页面被移动到了别的地址。',
  home: '返回首页',
  search: '从知识总纲重新找',
  homeHref: '/zh/',
  searchHref: '/zh/knowledge'
} : {
  title: 'Page not found',
  desc: 'The link may be out of date, or the page has moved to a different address.',
  home: 'Back to home',
  search: 'Start from the introduction',
  // /knowledge once the English knowledge digest has been translated
  homeHref: '/',
  searchHref: '/Introduction'
})
</script>

<template>
  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">{{ t.title }}</h1>
    <p class="desc">{{ t.desc }}</p>
    <div class="actions">
      <a class="home" :href="withBase(t.homeHref)">{{ t.home }}</a>
      <a class="search" :href="withBase(t.searchHref)">{{ t.search }}</a>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 128px 24px 96px;
  text-align: center;
}
.code {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 64px;
  font-weight: 600;
  line-height: 1;
}
.title {
  margin: 16px 0 0;
  font-size: 28px;
  line-height: 1.4;
}
.desc {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
}
.actions {
  margin-top: 32px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.home,
.search {
  display: inline-block;
  border-radius: 16px;
  padding: 0 24px;
  line-height: 44px;
  font-size: 14px;
  font-weight: 500;
  transition: color .25s, border-color .25s, background-color .25s;
}
.home {
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-1);
}
.home:hover {
  background-color: var(--vp-c-brand-2);
}
.search {
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-2);
}
.search:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-2);
}
</style>
