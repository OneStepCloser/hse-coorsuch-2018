<template>
    <div>
        <site-header/>
        <nuxt class="content"/>
    </div>
</template>
<script>

import SiteHeader from '~/components/SiteHeader';

export default {
    components: { SiteHeader },
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
