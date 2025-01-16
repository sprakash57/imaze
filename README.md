# Imaze

A simple image gallery app built with React, Vite, and TypeScript.

## Features

- Loads images from Pexels API
- Responsive Masonry Grid
- Infinite scroll
- Image Details with react-router
- Unit test cases

## Prerequisites

node version `22.0.0` or higher

## Technology stack

- React v19
- react-router
- emotion
- vite
- swc
- vitest
- @testing-library/react

## How to use

1. Clone the project and install dependencies with `npm install`
2. Create a `.env.local` at the root level of project and set below env variables
   - `VITE_PEXELS_API_KEY` = < Get your free api key from PEXELS >
   - `VITE_PEXELS_API_URL` = 'https://api.pexels.com/v1'
3. Run `npm run dev` to start the development server
4. Open a web browser and navigate to `http://localhost:5173/`

## Unit tests

- Run `npm test` for test cases
- To generate coverage run `npm run test-cov`

## Decisions made

1. Why did I choose React and Vite instead Next.js ?

   As per requirement, `react-router` was must and it does not make sense to use Next.js's Page router with react-router.

2. Why SWC over Babel?

   SWC is written in Rust, which offers faster compilation speeds compared to Babel, which is written in JavaScript. This can significantly reduce build times. SWC can minify code out-of-the-box. It also has modern ecmascript features. The only downside is the maturity of SWC and community support. Many of the plugins need higher version of node.

3. Why extra logic has been written for uniqueness of photos?

   The `curated` API from Pexels occasionally returns duplicate images. To ensure React renders lists efficiently, which requires unique keys, I had to perform some precalculations to guarantee that the gallery always displays distinct photos.
