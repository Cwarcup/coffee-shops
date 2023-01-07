## Features

- Optimized [fonts](https://nextjs.org/docs/api-reference/next/font) with `@next/fonts`.
- [SEO](https://nextjs.org/docs/api-reference/next/head) using `Head` component from `next/head`.
- Incremental static regeneration ([ISR](https://nextjs.org/docs/basic-features/data-fetching/overview#incremental-static-regeneration)) with `revalidate` for dynamic pages with `getStaticProps` and `getStaticPaths`. This is used for the coffee shop page and the coffee shop list page.
- Server Side Rendering ([SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering)) with `getServerSideProps` for the coffee shop page. HTML is generated at request time, but the data is fetched at build time and is up to date. Need this here because the coffee shops have a rating that changes over time.

