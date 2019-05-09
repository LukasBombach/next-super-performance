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
- `next-super-performance` A Next.js plugin that uses pool-attendant-preact to improve client side performance

On top of partial hydration we will implement loading strategies including `critical CSS`, `critical JS`, `lazy loading`, `preloading ressources`, etc. as part of next-super-performance.

## Documentation

For now we have a partial hydration POC for Next.js and this is how it works. When you create a `next.config.js` and use our plugin like so

```js
const withSuperPerformance = require("next-super-performance");
module.exports = withSuperPerformance();
```

2 things will happen:

- `React` will be replaced by `Preact` because it is only 3KB
- Next.js' main client JavaScript file will be discarded and replaced by a JavaScript file in your control

That means you have to create a `client.js` in your app's root folder that will act as the entry
point for the JavaScript that will be sent to the client. We do this to give you full control of
what you want your users to download and, very importantly, to choose the loading strategy that is
right for you.

Now `pool-attendant-preact` comes into play. pool-attendant-preact exports 3 APIs for you:

- `withHydration` a HOC that lets you mark your components for hydration
- `hydrate` a function to hydrate marked components in the client
- `HydrationData` a component that writes serialized props to the client, like `NEXT_DATA`

<img src="./docs/images/dyncamic-teaers.png" align="left"
     title="Dynamic elements in a static page" width="430">

Let's explain this by example. Say you have a Next app with a `header`, a `main` section and `teaser`s,
which are just headlines with a text snippet:
