## Features

- Optimized [fonts](https://nextjs.org/docs/api-reference/next/font) with `@next/fonts`.
- [SEO](https://nextjs.org/docs/api-reference/next/head) using `Head` component from `next/head`.
- Incremental static regeneration ([ISR](https://nextjs.org/docs/basic-features/data-fetching/overview#incremental-static-regeneration)) with `revalidate` for dynamic pages with `getStaticProps` and `getStaticPaths`. This is used for the coffee shop page and the coffee shop list page.
- Server Side Rendering ([SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering)) with `getServerSideProps` for the coffee shop page. HTML is generated at request time, but the data is fetched at build time and is up to date. Need this here because the coffee shops have a rating that changes over time.

## Packages and Tools

### Classnames

- [classnames](https://www.npmjs.com/package/classnames) is used to conditionally join class names together.
- used to conditionally join the `.glass` style to the card component.

### Glassmorphism

- [Glassmorphism](https://hype4.academy/tools/glassmorphism-generator) is a design trend that uses frosted glass effect in the UI.

### Foursquare API

- [Foursquare API](https://developer.foursquare.com/) is used to get the coffee shops data. Free API that requires an account to use. Has a limit of 50 queries per second.

## Takeaways

- Using `getStaticProps` to run server side code at build time. Used this function to fetch the coffee shop data from the API, and then pass it to the `Card` component as props. This allows for better performance because the data is fetched at build time and is up to date, as well as security because the data is not exposed to the client.
- Using `getStaticPaths` to generate the paths for the coffee shop pages.
  - These pages required the use of the `getStaticProps`, but I didn't have access to the `useRouter` object. In the dynamic paths I needed to get the `id` of the coffee shop from the `params` object. I used the `id` to fetch the coffee shop data from the API. I learnt that I could use the `params` object to get the `id` of the coffee shop.
    - I filtered the coffee shops to get the coffee shop with the matching `id`. I used the `find` method to get the coffee shop with the matching `id`. Did this on the server side because I didn't want to expose the data to the client.
  - Learnt about the `fallback` property. This property is used to determine what to do when a page is requested that is not generated at build time. The options are `true` or `false`. If `true`, the page will be generated at request time. This is more useful when you have a ton of static pages. If `false`, the page will return a 404 error. I used `false` because I wanted to return a 404 error if the page is not found.
- Custom hook to handle getting the user geolocation.

Making the dynamic store was tricky. I wanted to prerender the static pages, but also wanted to use the route to handle pages generated from a fetch request. The fetch request pages would be generated if a user requests to use their location to get nearby stores. 

I needed to tell the dynamic route to use static props if the user is not using their location, and use the `StoreContext` if the user is using their location. I set the `fallback` to `true` and used the `useRouter` hook to get the `query` object. I used the `query` object to check if the user is using their location. If the user is using their location, I used the `StoreContext` to get the store data. 

In all, if the `id` provided by the router object does not match the statically generated paths, then find the matching `id` in the `StoreContext` and return the store data. If the `id` does not match the `StoreContext`, then return a 404 error.