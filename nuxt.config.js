const webpack = require('webpack');
const path = require('path');

const assetsPath = path.join(__dirname, 'assets');
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        base: '/hse-coorsuch-2018/',
    },
} : {};

module.exports = {
    ...routerBase,
    build: {
        extend(config /* , ctx */) {
            config.resolve.alias['/assets'] = assetsPath;
            global.Element = null;
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: 'lodash',
            }),
        ],
    },
    head: {
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                name: 'msapplication-TileColor',
                content: '#5bbad5',
            },
            {
                name: 'theme-color',
                content: '#5bbad5',
            },
            {
                property: 'og:url',
                // content: 'https://onestepcloser.github.io/hse-coorsuch-2018/',
                content: 'http://kovtoroy.ru',
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
                content: 'http://uz24.uz/userfiles/images/182280_205984_hannah-belleza-goriz.jpg',
            },
        ],
        link: [
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#5bbad5' },
        ],
    },
    plugins: [
        {
            src: '@/nuxt_plugins/ElementUI.js',
        },
        {
            src: '@/nuxt_plugins/Autocomplete.js',
        },
        {
            src: '@/nuxt_plugins/YandexMetrika/index.js',
            ssr: false,
        },
    ],
    modules: [
        '@nuxtjs/axios',
    ],
};
