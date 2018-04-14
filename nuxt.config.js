const path = require('path');

const assetsPath = path.join(__dirname, 'assets');

const nodeExternals = require('webpack-node-externals');

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        base: '/hse-coorsuch-2018/',
    },
} : {};

module.exports = {
    ...routerBase,
    build: {
        extend(config, ctx) {
            config.resolve.alias['/assets'] = assetsPath;
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
            {
                property: 'og:url',
                content: 'https://onestepcloser.github.io/fintech-coorsuch/',
            },
            {
                property: 'og:title',
                content: 'Ко второй',
            },
            {
                property: 'og:description',
                content: 'Ко второй - расписание занятий и поиск свободных аудиторий в корпусах НИУ ВШЭ.',
            },
            {
                property: 'og:image',
                content: 'https://github.com/OneStepCloser/fintech-coorsuch/blob/master/public/images/soc-network.jpg?raw=true',
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
