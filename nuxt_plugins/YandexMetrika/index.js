import Vue from 'vue';
import VueYandexMetrika from 'vue-yandex-metrika';
import { abTestParamKey, genABTestParam } from '~/nuxt_plugins/YandexMetrika/ABtest';

export default ({ app: { router }, store }/* , inject */) => {
    Vue.use(VueYandexMetrika, {
        id: '48823934',
        router,
        env: process.env.NODE_ENV,
        // env: 'production',
        options: {
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            // params: {
            //     [abTestParamKey]: genABTestParam(store),
            // },
        },
    });
};
