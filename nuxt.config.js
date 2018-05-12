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
                property: 'og:url',
                content: 'https://onestepcloser.github.io/hse-coorsuch-2018/',
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
