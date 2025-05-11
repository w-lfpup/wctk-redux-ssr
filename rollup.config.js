import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    {
        input: "scripts/deps/redux.js",
        output: {
            file: "scripts/deps/redux_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    },
    {
        input: "scripts/deps/wctk.js",
        output: {
            file: "scripts/deps/wctk_bundled.js",
            format: "esm"
        },
        plugins: [
            nodeResolve()
        ]
    }
];