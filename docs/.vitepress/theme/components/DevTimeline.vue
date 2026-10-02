<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { FIELD_LABELS, PERIODS, TIMELINE, type TimelineEvent } from '../data/timeline'

// 发展史时间线：按时期分组的竖排编年。
//   · 顶部 chips 按分类筛选（带计数），分期与事件联动显隐
//   · 点事件行展开详情：为什么是这个时候、谁做的、链到站内对应章节
//   · 滚动进场动画由 IntersectionObserver 驱动，prefers-reduced-motion 下整体旁路
// 不想用交互的人：底部「按时期通读全部节点」是同一份数据的纯文本形态。

type Field = TimelineEvent['field']
type Filter = 'all' | Field

const filter = ref<Filter>('all')
const expanded = reactive(new Set<number>())

const fields = Object.keys(FIELD_LABELS) as Field[]
const filterOptions: Filter[] = ['all', ...fields]
const labelOf = (f: Filter) => (f === 'all' ? '全部' : FIELD_LABELS[f as Field])
const countOf = (f: Filter) =>
  f === 'all' ? TIMELINE.length : TIMELINE.filter((e) => e.field === f).length

const groups = computed(() =>
  PERIODS.map((p) => ({
    ...p,
    events: TIMELINE.map((e, i) => ({ e, i })).filter(
      ({ e }) => e.field === p.field && (filter.value === 'all' || e.field === filter.value),
    ),
  })).filter((g) => g.events.length > 0),
)

const toggle = (i: number) => {
  if (expanded.has(i)) expanded.delete(i)
  else expanded.add(i)
}

/* ---------- 滚动进场：JS + IO 可用才隐藏待入场；reduce / 无 JS 直出终态 ---------- */

const animate = ref(false)
const shown = reactive(new Set<number>())
let io: IntersectionObserver | null = null

const schedule = () => {
  void nextTick(() => {
    if (!io || !animate.value) return
    document.querySelectorAll<HTMLElement>('.dt-ev').forEach((el) => {
      const idx = Number(el.dataset.idx)
      if (!shown.has(idx)) io?.observe(el)
    })
  })
}

onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  animate.value = true
  io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue
        const idx = Number((en.target as HTMLElement).dataset.idx)
        shown.add(idx)
        io?.unobserve(en.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )
  schedule()
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})

watch(filter, schedule)

/* ---------- 通读段 ---------- */

const allGroups = computed(() =>
  PERIODS.map((p) => ({
    ...p,
    events: TIMELINE.map((e, i) => ({ e, i })).filter(({ e }) => e.field === p.field),
  })),
)
</script>

<template>
  <div class="dt">
    <div class="dt-controls" role="group" aria-label="按分类筛选">
      <button
        v-for="f in filterOptions"
        :key="f"
        type="button"
        :class="['chip', { 'is-active': filter === f }]"
        :aria-pressed="filter === f"
        @click="filter = f"
      >
        {{ labelOf(f) }}
        <span class="count">{{ countOf(f) }}</span>
      </button>
    </div>

    <section v-for="g in groups" :key="g.name" class="period">
      <header class="p-head">
        <svg class="p-hex" viewBox="0 0 24 24" aria-hidden="true">
          <polygon
            points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
        <div class="p-head-text">
          <h2>{{ g.name }}</h2>
          <p class="p-range">{{ g.range }}</p>
        </div>
      </header>
      <p class="p-intro">{{ g.intro }}</p>

      <ol class="events">
        <li
          v-for="{ e, i } in g.events"
          :key="i"
          :data-idx="i"
          :class="['dt-ev', { 'is-hidden': animate && !shown.has(i), 'is-open': expanded.has(i) }]"
        >
          <button
            type="button"
            class="ev-row"
            :aria-expanded="expanded.has(i)"
            @click="toggle(i)"
          >
            <span class="ev-year">{{ e.year }}</span>
            <span class="ev-main">
              <span class="ev-title">{{ e.title }}</span>
              <span class="ev-who">{{ e.who }}</span>
            </span>
            <span class="ev-mark" aria-hidden="true" />
          </button>
          <div v-show="expanded.has(i)" class="ev-detail">
            <p class="ev-label">{{ FIELD_LABELS[e.field] }}</p>
            <p class="ev-why">{{ e.why }}</p>
            <a v-if="e.link" class="ev-more" :href="withBase(e.link)">进入相关章节</a>
          </div>
        </li>
      </ol>
    </section>

    <details class="dt-list">
      <summary>按时期通读全部 {{ TIMELINE.length }} 个节点</summary>
      <section v-for="g in allGroups" :key="'L' + g.name" class="l-era">
        <header class="l-head">
          <h2>{{ g.name }}</h2>
          <p class="l-range">{{ g.range }}</p>
          <p class="l-intro">{{ g.intro }}</p>
        </header>
        <ol class="l-events">
          <li v-for="{ e } in g.events" :key="e.year + e.title">
            <span class="l-node" :data-field="e.field" />
            <span class="l-year">{{ e.year }}</span>
            <div class="l-body">
              <h3>{{ e.title }}</h3>
              <p class="l-who">
                {{ e.who }}<span class="l-tag">{{ FIELD_LABELS[e.field] }}</span>
              </p>
              <p class="l-why">{{ e.why }}</p>
              <a v-if="e.link" class="l-more" :href="withBase(e.link)">进入相关章节</a>
            </div>
          </li>
        </ol>
      </section>
    </details>
  </div>
</template>

<style scoped>
.dt {
  margin-top: 1.5rem;
}

/* ---------- 筛选 chips ---------- */

.dt-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.6rem;
}
.chip {
  border: 1px solid rgba(124, 58, 237, 0.28);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 999px;
  padding: 0.28rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.chip:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}
.chip.is-active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}
.count {
  margin-left: 0.3rem;
  font-size: 0.75rem;
  opacity: 0.65;
  font-family: var(--vp-font-mono);
  font-variant-numeric: tabular-nums;
}

/* ---------- 分期 ---------- */

.period {
  margin: 0 0 2.6rem;
}
.p-head {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  padding-bottom: 0.55rem;
  border-bottom: 1px solid rgba(124, 58, 237, 0.28);
}
.p-hex {
  width: 17px;
  height: 17px;
  flex: none;
  color: var(--vp-c-brand-1);
  opacity: 0.75;
  transform: translateY(2px);
}
.p-head-text h2 {
  display: inline-block;
  margin: 0;
  font-size: 1.3rem;
  line-height: 1.3;
}
.p-range {
  display: inline-block;
  margin: 0 0 0 0.7rem;
  font-family: var(--vp-font-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
.p-intro {
  margin: 0.7rem 0 1.3rem;
  color: var(--vp-c-text-2);
  font-size: 0.93rem;
  max-width: 42em;
}

/* ---------- 事件 ---------- */

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dt-ev {
  position: relative;
  padding-left: 2.2rem;
  transition: opacity 0.45s ease, transform 0.45s ease-out;
}
/* 脊线与圆点同轴：脊线 left 0.9rem（宽 1px），圆点 left 0.9rem - 4px（宽 9px），中心都在 0.9rem + 0.5px */
.dt-ev::before {
  content: '';
  position: absolute;
  left: 0.9rem;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(124, 58, 237, 0.18);
}
.dt-ev::after {
  content: '';
  position: absolute;
  left: calc(0.9rem - 4px);
  top: 0.98rem;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-bg);
}
.dark .dt-ev::before {
  background: rgba(167, 139, 250, 0.22);
}
.dt-ev.is-hidden {
  opacity: 0;
  transform: translateY(14px);
}

.ev-row {
  display: grid;
  grid-template-columns: 2.9rem 1fr auto;
  column-gap: 0.55rem;
  align-items: baseline;
  width: 100%;
  padding: 0.42rem 0.55rem 0.42rem 0.15rem;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}
.ev-row:hover {
  background: var(--vp-c-bg-soft);
}
.ev-row:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
.ev-year {
  font-family: var(--vp-font-mono);
  font-size: 0.88rem;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}
.ev-main {
  display: grid;
  gap: 0.1rem;
}
.ev-title {
  font-family: var(--vp-font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}
.dt-ev.is-open .ev-title {
  color: var(--vp-c-brand-1);
}
.ev-who {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
.ev-mark {
  position: relative;
  width: 15px;
  height: 15px;
  transform: translateY(2px);
  transition: transform 0.2s;
}
.ev-mark::before,
.ev-mark::after {
  content: '';
  position: absolute;
  background: var(--vp-c-text-3);
  transition: background 0.2s;
}
.ev-mark::before {
  left: 0;
  right: 0;
  top: 7px;
  height: 1.5px;
}
.ev-mark::after {
  top: 0;
  bottom: 0;
  left: 7px;
  width: 1.5px;
}
.dt-ev.is-open .ev-mark {
  transform: translateY(2px) rotate(45deg);
}
.dt-ev.is-open .ev-mark::before,
.dt-ev.is-open .ev-mark::after {
  background: var(--vp-c-brand-1);
}

.ev-detail {
  margin: 0.1rem 0 1.1rem;
  padding: 0.75rem 1rem 0.85rem;
  border-left: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  border-radius: 0 8px 8px 0;
}
.ev-label {
  margin: 0 0 0.4rem;
  display: inline-block;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  border: 1px solid rgba(124, 58, 237, 0.28);
  border-radius: 3px;
  padding: 0 0.35rem;
}
.ev-why {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.93rem;
  line-height: 1.8;
  max-width: 62ch;
}
.ev-more {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.ev-more:hover {
  text-decoration: underline;
}

/* ---------- 通读段 ---------- */

.dt-list {
  margin-top: 2.4rem;
}
.dt-list > summary {
  cursor: pointer;
  font-family: var(--vp-font-display);
  font-size: 1.02rem;
  color: var(--vp-c-text-2);
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(124, 58, 237, 0.28);
}
.dt-list > summary:hover {
  color: var(--vp-c-brand-1);
}
.l-era {
  margin: 2.3rem 0 0;
}
.l-head h2 {
  font-family: var(--vp-font-display);
  font-size: 1.2rem;
  margin: 0 0 0.15rem;
}
.l-range {
  font-family: var(--vp-font-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin: 0 0 0.45rem;
  font-variant-numeric: tabular-nums;
}
.l-intro {
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  max-width: 42em;
  margin: 0 0 1.3rem;
}
.l-events {
  list-style: none;
  margin: 0;
  padding: 0 0 0 1.4rem;
}
.l-events li {
  position: relative;
  display: grid;
  grid-template-columns: 3.4rem 1fr;
  column-gap: 1rem;
  padding-bottom: 1.6rem;
}
.l-node {
  position: absolute;
  left: -1.4rem;
  top: 0.5rem;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-bg);
  margin-left: -3.5px;
}
.l-year {
  font-family: var(--vp-font-mono);
  font-size: 0.88rem;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
  padding-top: 0.22rem;
}
.l-body h3 {
  font-family: var(--vp-font-display);
  font-size: 1rem;
  margin: 0 0 0.12rem;
}
.l-who {
  margin: 0 0 0.3rem;
  font-size: 0.84rem;
  color: var(--vp-c-text-3);
}
.l-tag {
  margin-left: 0.6rem;
  font-size: 0.72rem;
  border: 1px solid rgba(124, 58, 237, 0.28);
  border-radius: 3px;
  padding: 0 0.35rem;
}
.l-why {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  max-width: 42em;
}
.l-more {
  display: inline-block;
  margin-top: 0.28rem;
  font-size: 0.84rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.l-more:hover {
  text-decoration: underline;
}

/* ---------- 窄屏与减少动态 ---------- */

@media (max-width: 768px) {
  .dt-ev {
    padding-left: 1.5rem;
  }
  .dt-ev::before {
    left: 0.5rem;
  }
  .dt-ev::after {
    left: calc(0.5rem - 4px);
  }
  .ev-row {
    grid-template-columns: 2.6rem 1fr auto;
  }
  .l-events li {
    grid-template-columns: 1fr;
    row-gap: 0.1rem;
  }
  .l-node {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chip,
  .dt-ev,
  .ev-mark,
  .ev-mark::before,
  .ev-mark::after {
    transition: none;
  }
  .dt-ev.is-hidden {
    opacity: 1;
    transform: none;
  }
}
</style>
