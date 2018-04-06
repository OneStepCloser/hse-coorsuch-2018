<template>
    <div class="page-wrap">
        <not-logged-block/>
        <site-header/>
        <current-pairs/>
        <nuxt class="content"/>
        <!--<site-footer/>-->
    </div>
</template>
<script>

import SiteHeader from '~/components/SiteHeader';
import CurrentPairs from '~/components/CurrentLessons';
import NotLoggedBlock from '~/components/NotLoggedBlock';
import SiteFooter from '~/components/SiteFooter';

import { getMonday, getSunday, dateForRequest } from '~/assets/js/utils';
import { currentDay } from '~/assets/js/static_data';


export default {
    name: 'DefaultLayout',
    created() {
        this.$store.dispatch('loadBuildings')
            .then(() => {
                console.log('OK');
            })
            .catch((error) => {
                console.log(error);
            });
        this.$store.dispatch('loadEmailFromLocalStorage');
        this.$store.dispatch('loadPreferedBuilding');
        // this.$store.dispatch('loadEmailFromLocalStorage');

        if (this.$store.getters.email !== -1) {
            const today = new Date(currentDay); // TODO
            const monday = getMonday(today);
            const sunday = getSunday(today);
            //console.log('MONDAY SUNDAY', monday, sunday);

            this.$store.dispatch('loadPersonalSchedule', { fromDate: dateForRequest(monday), toDate: dateForRequest(sunday) })
                .then((response) => {
                    //console.log('SCHEDULE LOADED, RESPONSE:', response);
                });
        }
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
