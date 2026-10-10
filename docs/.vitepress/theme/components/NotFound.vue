<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">页面不存在</h1>
    <p class="desc">链接可能已失效，或页面被移动到了别的地址。</p>
    <div class="actions">
      <a class="home" :href="withBase('/')">返回首页</a>
      <a class="search" :href="withBase('/knowledge')">从知识总纲重新找</a>
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
