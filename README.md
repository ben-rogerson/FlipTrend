# FlipTrend

A web app to display company stock items by country.

## File/folder structure

As this is a small project while still requiring component organisation, I chose a component-based structure where files are primarily organised around the reusable UI components:

```shell
# Component-based project structure (current)
└── src
    ├── components
    │   ├── CompanyCard
    │   ├── LoginForm
    │   │   ├── LoginForm.tsx
    │   │   └── LoginFormContext.tsx (React context functions)
    │   └── RegisterForm
    │       ├── RegisterForm.tsx
    │       └── RegisterFormContext.tsx (React context functions)
    ├── hooks
    ├── pages
    │   ├── Home.tsx
    │   └── About.tsx
    ├── services
    │   ├── api
    │   │   ├── userApi.ts
    │   │   └── postApi.ts
    │   ├── authentication.ts
    │   └── dataFetching.ts
    ├── utils
    ├── App.tsx
    └── main.tsx
```

This was chosen as it’s most suitable for smaller projects when there are not too many features and where components are the primary building blocks.
This structure also makes it easier to locate and maintain code related to specific UI elements.

<details>
  <summary>But what if the project grows?... 🤔</summary>
<br/>
Should this project grow, I would consider a slight upgrade to a feature-based structure where files are better organised in the components folder around the features of the app:

```shell
# Feature-based project structure
└── src
    ├── assets
    ├── components
    │   ├── FeatureA
    │   │   ├── ...
    │   └── FeatureB
    │       ├── ...
    ├── hooks
    ├── pages
    │   ├── ...
    ├── services
    │   ├── ...
    ├── utils
    └── index.tsx
```

If the project were to grow past that, I would consider a domain-based structure where files are organised by the domains of the app at top level. This would be suitable for complex functionality as it provides a better design for scalability and maintainability. Note the `common` folder for shared components, hooks, services, and utils.

```shell
# Domain-based project structure
└── src
    ├── common
    │   ├── components
    │   │   └── Button.tsx
    │   ├── hooks
    │   ├── services
    │   │   └── api.ts
    │   └── utils
    ├── auth
    │   ├── components
    │   │   ├── LoginForm.tsx
    │   │   └── RegisterForm.tsx
    │   ├── hooks
    │   ├── pages
    │   │   ├── Login.tsx
    │   │   └── Register.tsx
    │   └── store
    │       └── auth.ts
    └── index.tsx
```

Anything beyond this would require a more complex structure with a monorepo setup, microservices, or a more complex architecture.

</details>

## Why I chose&hellip;

- Why use client rendering (non-ssr)
  - This app aims to be as simple as possible (no over engineering) - SSR adds a server and more complexity.
  - SEO is not a priority - this is a private app for a small group of users.
  - The app is small and doesn’t require the performance benefits of SSR (like improving TTFB/FCP).
  - The page content is highly dynamic and interactive, so client rendering is a better fit.
- Why Vite
  - Vite is a modern build tool that is fast and simple to use.
  - It has a great developer experience with features like hot module replacement.
  - It’s simple and light and doesn’t require a complex setup.
  - It has a great plugin system and is easy to extend.
  - It’s not like Webpack - configuration is simple and easy to understand.
  - It’s well suited for small CSR apps like this one. If SSR is required then Remix.js would be a better choice (it uses Vite under-the-hood).
- Why Tailwind
  - It only creates css from the classes you use, so it’s very light.
  - It’s easy to use and has a great developer experience.
  - It’s great for prototyping and iterating quickly.
  - It’s easy to customise and extend.
  - It’s quick to add styles for responsive design.
  - Cons: It can be hard to read the JSX and maintain in large projects / It forces you to use components to avoid duplicate class sets (good thing though) / You pretty much need to use a helper like `clsx` or `classnames` to deal with conditional classes and large class sets.
- Why Tanstack Query
  - It’s a great data fetching library that’s easy to use and has a great developer experience.
  - It’s simple and light and doesn’t require a complex setup.
  - It’s great for caching and refetching data and handles a bunch of common use cases.
- Why Million.js
  - It’s a faster React compiler that removes the diffing algorithm.
  - It’s great for large lists, like this app has after you scroll a few times.
  - Cons: `<slots/>` littering up the elements panel / covers up some react errors
- Why Wouter
  - It’s a tiny router for React that’s easy to use and has a great developer experience.
  - It’s simple and light and doesn’t require a complex setup.
  - It offers hooks for easy navigation and URL params.
  - It a similar api to React Router, so it’s familiar and easy to switch to if needed.
  - It has a great name.
- Why Vitest
  - It couples well with Vite, is easy to set up and natively supports ESM (unlike Jest).

## Accessibility

- [x] Used the chrome dev tools DOM Tree view to assess the accessibility tree.
- [x] Made app accessible by keyboard navigation.
- [x] Ensured github svg icons have `aria-label` for screen readers.
- [x] Company search: Used [Radix accessible components](https://www.radix-ui.com/primitives/docs/overview/accessibility) to ensure a wide range of A11y and UX features are available (Eg: `aria` and `role` attributes, focus management, and keyboard navigation).
- [x] Company results list: Added [`role="feed"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/feed_role) and an accompanying dynamic `aria-busy` to announce changes to screen readers.
- [x] Snowflake graph: Added screen-reader text to announce the total company scores and individual scores.
- [x] Company market cap: Added a custom `aria-label` to pronounce the value in a better way for screen readers.
- [x] Company score: Added a custom `aria-label` to pronounce the value in a better way for screen readers.
- [x] Sort by market cap
  - Used `:has(:focus-within)` to highlight to the sorting arrow container when focussed for keyboard users (but not for pointer users).
  - Added a custom `aria-label` to the sorting arrow to announce the sort order to screen readers.
  - Hid the visual text to screen readers using `aria-hidden` to avoid duplicate announcements.

## Tests

- [ ] TODO: Add additional tests to improve coverage
  - Eg: Test Country switching, Sort switching, Link clicking, It renders, Chart display, Market cap, Score

## Performance improvements

- [x] Used [Tailwind CSS](https://tailwindcss.com/) for styling to ensure minimal css generation from only the used classes.
- [x] Added [Million.js](https://million.dev/docs/introduction#why-millionjs) to speed up React reconciliation - it removes the React diffing algorithm and directly updates the DOM nodes instead - this benefits my large market list which contains many elements.
- [x] Country picker: Added virtualization using [TanStack Virtual](https://tanstack.com/virtual/latest) to improve performance when scrolling through list.
  - Tradeoff: Had to abandon the built in filtering support from the [cmdk](https://cmdk.paco.me/) package and add my own.
- [x] Company list: Added custom virtualization using intersection observer.
  - Tradeoff: Say goodbye to browser based "Find" (⌘F).
- [x] Used the [Web Vitals Extension](https://github.com/GoogleChrome/web-vitals-extension) to assess page load performance and improve metrics throughout development.
- [x] Used [Lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) in the Chrome developer tools to improve desktop performance score from 99 to 100.
- [x] Added `<link rel="preconnect" href="https://simplywall.st" crossorigin />` to the head of the document to reduce the time taken to connect to the API.
- [x] Added `<link rel="preconnect" href="https://upload.wikimedia.org" crossorigin />` to the head of the document to reduce the time taken to connect to wikipedia to grab the company flag svgs.
- [x] Minified SVG's using [Iconish](https://iconish.benrogerson.dev/) (my own svg minifier) to reduce files sizes.
- [x] Code splitting:
  - Configured Rollup to output separate .js bundles to potentially take advantage of parallel loading and to keep bundle size underneath `500kb`.
- [x] Used `React.lazy` to lazy load the country picker component as it’s not visible by default and it can reduce the initial bundle size.

### SEO

This app isn’t designed with SEO in mind. If I were to improve SEO, I would switch to a server-rendered implementation with Next.js or Remix.

To avoid search engine indexing, I added a `robots.txt` file containing code to disallow all search engine bots from indexing the site. I also added a meta tag to the head of the document to prevent indexing.

Here’s some items I did add, which would be beneficial for SEO:

- [x] Added a custom `useTitle` hook to add meta tags to the head of the document.
- [x] Route to the country name when a specific country is chosen, eg: `/au`
- [x] Avoided using `div` for semantic elements like buttons and links.
- [x] Used semantic elements like `section`, `article`, `header`, `footer`, and `main` where appropriate.

### Responsive design

The app is fully responsive and displays well on all screen sizes.

I used CSS container queries to ensure the app adapts to different screen sizes and orientations.
In particular, these were handy for the company cards, as the layout changes depending on the screen size, and the company cards themselves change their layout based on their container size. This ensures the cards always look good and display their best layout for the space they each have available.

I also made the company search box adapt for smaller devices by switching it to a swipeable bottom modal. This ensures the user can easily see and interact with the list of countries because interacting with a traditional select-style dropdown kinda sucks on mobile.

I also ensured that interactive elements are large enough to be easily tapped on mobile devices. For example, the market cap sort buttons are intentionally large for this reason - it also benefits pointer interactions too as they’re larger hit areas.

### Fonts

- [x] Added `font-display: swap;` to the custom `@font-face` declarations to show a fallback font if the specified font is still loading.
- [x] Compressed fonts to WOFF2 format with [cloudconvert](https://cloudconvert.com) to reduce the file size.
- [x] Removed unused characters from custom fonts using [FontForge](https://fontforge.org/en-US/) to reduce the total custom font file size by 238%.

---

Check out the app at: 💹 [fliptrend.benrogerson.dev](https://fliptrend.benrogerson.dev/)

## About

- This SPA was bootstrapped with [Vite](https://vitejs.dev/) using their React + SWC template.
- Data fetching and caching is handled by [TanStack Query](https://tanstack.com/query/v5/)
- The responsive UI uses [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- The app is built with [React](https://reactjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/) with animations from [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)
- It is currently deployed on [Vercel](https://vercel.com/)

## Run this project locally

1. Clone the project:

```shell
npx degit https://github.com/ben-rogerson/FlipTrend FlipTrend
```

2. cd into the project and install the dependencies:

```shell
cd $_ && pnpm install
```

3. Then choose one of these tasks:

Start the development server:

```shell
pnpm run dev
```

Or build and preview the project:

```shell
pnpm run build
pnpm run preview
```

## Supported browsers

Tested in:

- Chrome (122)
- Firefox (123.0.1)
- Safari (17)
- Edge (119)

Also tested on mobile Chrome and Safari.

## Technologies

- [Vite](https://vitejs.dev/) - Frontend tooling
- [React](https://reactjs.org/) - Framework
- [Million.js](https://million.dev/) - Faster React compiler
- [Wouter](https://github.com/molefrog/wouter) - Tiny router for React
- [TailwindCSS](https://tailwindcss.com/) - Styling framework
- [TanStack Query](https://tanstack.com/query/v5/) - Data fetching and caching

## TODO

- [ ] Fix occasional card height issues (need to track this down)
- [ ] Fix occasional card hidden issues when after toggling sorting
- [ ] Add more tests
- [ ] Add more accessibility improvements
- [ ] Add internationalization support
- [ ] Add support for card height calc on resize
- [ ] Fix location button hover/trigger width
- [ ] Switch to a better styled centred header on mobile
