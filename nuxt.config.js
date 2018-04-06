// const ApidocGenerator = require('./nuxt_plugins/apidoc/ApidocGenerator.js');
// const config = require('dotenv')
//     .config({ path: '../.env' }).parsed;

const nodeExternals = require('webpack-node-externals');

module.exports = {
    // env: config,
    build: {
        extend(config, ctx) {
            global.Element = null;
            if (ctx.isServer) {
                config.externals = [
                    nodeExternals({
                        whitelist: [/^vue2-collapse/],
                    }),
                ];
            }
        },
    },
    head: {
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                rel: 'favicon',
                href: 'favicon.ico',
            },
        ],
    },
    plugins: [
        {
            src: '@/nuxt_plugins/ElementUI.js',
        },
        // {
        //     src: '@/nuxt_plugins/V-tooltip.js',
        //     ssr: false,
        // },
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/font-awesome',
    ],
};
