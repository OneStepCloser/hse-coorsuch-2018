<template>
    <div class="page-wrap">
        <not-logged-block/>
        <site-header/>
        <current-pairs/>
        <nuxt class="content"/>
        <site-footer/>
    </div>
</template>
<script>

import SiteHeader from '~/components/SiteHeader';
import CurrentPairs from '~/components/CurrentLessons';
import NotLoggedBlock from '~/components/NotLoggedBlock';
import SiteFooter from '~/components/SiteFooter';

export default {
    name: 'DefaultLayout',

    created() {
        console.log('STORE', this.$store);
        this.$store.dispatch('loadBuildings')
            .then(() => {
                console.log('OK');
            })
            .catch((error) => {
                console.log(error);
            });
    },
    components: {
        SiteFooter,
        NotLoggedBlock,
        CurrentPairs,
        SiteHeader,
    },
};
</script>
<style lang="scss">
    @import '~@/assets/style/main.scss';

    html {
        font-family: SourceSansPro, sans-serif;
        font-size: 14px;
        margin-bottom: -100px;
    }

    .content {
        background: white;
    }

    .page-wrap {

    }
</style>
