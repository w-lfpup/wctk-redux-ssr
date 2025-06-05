import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    {
        input: "www/scripts/deps/redux.js",
        output: {
            file: "www/scripts/deps/redux_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    },
    {
        input: "www/scripts/deps/wctk.js",
        output: {
            file: "www/scripts/deps/wctk_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    }
];