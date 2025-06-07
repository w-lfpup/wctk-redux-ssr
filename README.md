# Wctk-Redux-SSR-Demo

A demonstration of a possible way to build a server-side-rendered web app with web components and state management.

Checkout the [live demo](https://w-lfpup.github.io/wctk-redux-ssr-demo)!

## Details

For this example, web components are built using [wctk-js](https://github.com/w-lfpup/wctk-js) and state management is implemented with [redux](https://redux.js.org)

This example demonstrates how to deliver an initial response with:
- SSR / SSG styles and structure
- No FOUC (flash of unstyled content)
- Web components via declarative shadow dom

Then afterwards:
- Progressively-enhance state-management with redux
- Progressively-enhance web-component interactivity with wctk-js
- Subscribe components to datastores like redux with wctk-js

## License

Wctk-Redux-SSR-Demo is released under the BSD-3 Clause License.
