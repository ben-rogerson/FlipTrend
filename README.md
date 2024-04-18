# FlipTrend

A web app to display company stock items by country.

## TODO

- [ ] Compile requirements
- [ ] Compile features
- [ ] Initial Figma design
- [ ] Setup project
- [ ] Make it deploy
- [ ] Work out the data structure
- [ ] Scaffold basic UI with mock data
- [ ] Fetch data from API
- [ ] Display data in UI
- [ ] Add routing for Market/Location filtering
- [ ] Add market cap sorting by URL params
- [ ] Error management

## File/folder structure

As this is a small project while still requiring component organisation, I chose a component-based structure where files are primarily organised around the reusable UI components:

```shell
# Component-based project structure (current)
└── src
    ├── components
    │   ├── Button
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

- [ ] Why use client rendering (non-ssr)
  - This app aims to be as simple as possible (no over engineering) - SSR adds a server and more complexity.
  - SEO is not a priority - this is a private app for a small group of users.
  - The app is small and doesn’t require the performance benefits of SSR (like improving TTFB/FCP).
  - The page content is highly dynamic and interactive, so client rendering is a better fit.
- [ ] Why Vite
  - Vite is a modern build tool that is fast and simple to use.
  - It has a great developer experience with features like hot module replacement.
  - It’s simple and light and doesn’t require a complex setup.
  - It has a great plugin system and is easy to extend.
  - It’s not like Webpack - configuration is simple and easy to understand.
  - It’s well suited for small CSR apps like this one. If SSR is required then Remix.js would be a better choice (it uses Vite under-the-hood).
- [ ] Why Tailwind
  - It only creates css from the classes you use, so it’s very light.
  - It’s easy to use and has a great developer experience.
  - It’s great for prototyping and iterating quickly.
  - It’s easy to customise and extend.
  - It’s quick to add styles for responsive design.
  - Cons: It can be hard to read the JSX and maintain in large projects / It forces you to use components to avoid duplicate class sets (good thing though) / You pretty much need to use a helper like `clsx` or `classnames` to deal with conditional classes and large class sets.
- [ ] Why Tanstack
  - ....
- [ ] Why Million.js
  - It’s a faster React compiler that removes the diffing algorithm.
  - It’s great for large lists, like this app has after you scroll a few times.
  - Cons: `<slots/>` littering up the elements panel / covers up some react errors
- [ ] Why Wouter
  - It’s a tiny router for React that’s easy to use and has a great developer experience.
  - It’s simple and light and doesn’t require a complex setup.
  - It offers hooks for easy navigation and URL params.
  - It a similar api to React Router, so it’s familiar and easy to switch to if needed.
  - It has a great name.
- [ ] Why Vitest
  - ...

## Accessibility

- [x] Added `aria-label` to the search input to improve screen reader support.
- [x] Added `aria-live="polite"` to the search results to announce changes to screen readers.
- [x] Added screen-reader text to replace the snowflake graph for the graph total and individual scores.
- [x] Added a custom `aria-label` to the market cap to pronounce the value in a better way for screen readers.
- [x] Added a custom `aria-label` to the total score to pronounce the value in a better way for screen readers.

## Tests

- [ ] Add Vitest unit tests for radar chart color function
- [ ] Add Vitest unit tests for radar chart data function
- [ ] TODO: Setup Playwright for E2E tests

## Performance improvements

- [x] Used [Tailwind CSS](https://tailwindcss.com/) for styling to ensure minimal css generation from only the used classes.
- [x] Added [Million.js](https://million.dev/docs/introduction#why-millionjs) to speed up React reconciliation - it removes the React diffing algorithm and directly updates the DOM nodes instead - this benefits my large market list which contains many elements.
- [x] Used list virtualisation/windowing using [TanStack virtualiser](#) to only render the visible items in the list - this avoids rendering all the items at once to give butter-smooth scrolling and lightning fast page loads. Con: Say goodbye to browser based "Find" (⌘F).
- [x] Reduced re-rendering by using `React.memo` and `useMemo` to prevent unnecessary re-renders.
- [x] Used the [Web Vitals Extension](https://github.com/GoogleChrome/web-vitals-extension) to assess performance and improve metrics throughout development.
- [ ] Used [Lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) in the Chrome developer tools to improve performance score from 90 to 100 (screenshot?).
- [x] Added `<link rel="preconnect" href="https://simplywall.st" crossorigin />` to the head of the document to slightly reduce the time taken to connect to the API.
- [x] Minified SVG's using [Iconish](https://iconish.benrogerson.dev/) (my own svg minifier) to reduce files sizes.

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

## Features

- [x] ...

## Future features

- [ ] ...
- [ ] Add E2E tests
- [ ] Performance improvements (re-rendering)

## Run this project locally

1. Clone the project:

```shell
npx degit https://github.com/ben-rogerson/FlipTrend FlipTrend
```

2. cd into the project and install the dependencies:

```shell
cd $_ && npm install
```

3. Then choose one of these tasks:

Start the development server:

```shell
npm run dev
```

Or build and preview the project:

```shell
npm run build
npm run preview
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
