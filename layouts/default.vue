<template>
    <div>
        <site-header/>
        <current-pairs/>
        <nuxt class="content"/>
    </div>
</template>
<script>

import SiteHeader from '~/components/SiteHeader';
import CurrentPairs from '~/components/CurrentPairs';

export default {
    components: {
        CurrentPairs,
        SiteHeader },
    name: 'DefaultLayout',
};
</script>
<style lang="scss">
    @import '~@/assets/style/main.scss';

    html {
        font-family: SourceSansPro, sans-serif;
        font-size: 14px;
    }

    .content {
        background: white;
    }
</style>
