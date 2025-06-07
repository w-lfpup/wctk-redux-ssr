import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    {
        input: "example/deps/redux.js",
        output: {
            file: "example/deps/redux_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    },
    {
        input: "example/deps/wctk.js",
        output: {
            file: "example/deps/wctk_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    }
];