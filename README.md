# 🏎 next-super-performance

<img src="./docs/images/dyncamic-elements-in-static-page.png" align="right"
     title="Dynamic elements in a static page" width="430">

Partial hydration for [Next.js](https://github.com/zeit/next.js/) with [Preact X](https://github.com/developit/preact).

---

**Explanation:** At spring we are creating websites for newspapers and we are very, **very** performance aware.

Newspapers are mostly static pages. Now if we were to create a single page application we would
create a huge bundle with mostly unnecessary code.

This does not only mean that users wait for a big file to download, but [as Addy Osmami points out](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
there is a huge cost in performance with parsing and executing code. As a vague rule of thumb we can
say, the bigger your bundle, the worse your performance.

---

<br/>

That is why we aim to cut bundle size by only shipping the code we actually need in the client and leave the rest to server side rendering.

## Overview

This repo ist still a proof of concept, we will continue to work on this and implement our work
as 2 packages:

- `pool-attendant-preact` A library that implements partialy hydration with preact x
- `next-super-performace` A Next.js plugin that uses pool-attendant-preact to improve client side performance

On top of partial hydration we will implement loading strategies including `critical CSS`, `critical JS`, `lazy loading`, `preloading ressources`, etc. as part of next-super-performace.
