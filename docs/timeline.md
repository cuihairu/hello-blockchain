---
title: Development Timeline
---

<script setup>
import DevTimeline from './.vitepress/theme/components/DevTimeline.vue'
</script>

# Development Timeline

Blockchain did not appear out of thin air in 2008. Every part it needed — public-key exchange, blind signatures, hash chains, proof of work — had already been built in the cryptography papers of the preceding thirty years; what was always missing was the motive to assemble them. On 2008-10-31, six weeks after Lehman Brothers collapsed, Satoshi Nakamoto posted the whitepaper, fitting those parts together into a machine that could actually live; and in every year since, someone has been asking the same question: what else can this machine do?

This line arranges 49 timeline nodes in order of appearance, split into five periods: the prehistory of cryptography, Bitcoin, Ethereum, privacy and scaling, and the divergence of consensus and chains. Each node first answers "why this moment" — why The DAO incident happened precisely two years after the ICO template was written down, why Bulletproofs cut Monero's fees by eighty percent in one stroke, why the Merge took ten years to arrive. Nodes can be expanded, with both the who and the why inside; most nodes also link to the site's corresponding section, so once you have read the reason you can step straight into the main text.

The category chips at the top let you follow a single line at a time. Watch only "the divergence of consensus and chains," and you will see how PPCoin in 2012 grew, nine years later, into the Merge; watch only "the prehistory of cryptography," and you will see how those two unfinished 1998 sketches — pricing hashrate under Sybil attack — were settled all at once by the block of 2009-01-03, stamped with that Times headline. In the dense stretches you read the same questions being asked over and over; in the empty stretches, what you usually read is what nobody had yet thought to ask.

**If you need to read through everything**, the "read all nodes by period" section at the bottom of the page is the same data in text form, independent of any interaction, easy to check item by item against [consensus algorithms](/consensus/Consensus) and [notable blockchain projects](/chains/Chain). For the algorithm lineage alone, there is also the year-ordered [consensus algorithm timeline](/consensus-timeline): its 64 timeline entries complement this page's 49 nodes; for an entry point ordered by each chain's first mainnet launch, see [navigate by time](/nav/ByTime). The three pages focus respectively on where algorithms came from and who adopted them, on why events happened when they did, and on the order in which chains went live.

<DevTimeline />
