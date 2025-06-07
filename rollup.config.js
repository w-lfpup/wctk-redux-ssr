import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    {
        input: "demo/deps/redux.js",
        output: {
            file: "demo/deps/redux_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    },
    {
        input: "demo/deps/wctk.js",
        output: {
            file: "demo/deps/wctk_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    }
];