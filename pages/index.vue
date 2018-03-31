<template>
    <div>
        <div v-for="day in personalSchedule">
            <span>{{ day }}</span>
            <br><br>
        </div>
        <br>
        <br>
        <br>
        <div v-for="day in personalSchedule">
            <span>
                {{ day[0].dayOfWeekString }}
                {{ day[0].date }}
            </span>
            <br>
            <span v-for="lesson in day">
                {{ lesson.beginLesson }}
                {{ lesson.endLesson }}
                {{ lesson.kindOfWork }}
                {{ lesson.discipline }}
                {{ lesson.lecturer }}
                {{ lesson.building }}
                <br>
            </span>
            <br><br>
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { getMonday, getSunday, getWeek } from '~/utils';

export default {
    name: 'Index',
    layout: 'default',
    date() {
        return {
            week: [],
        };
    },
    computed: {
        ...mapGetters({
            personalSchedule: 'personalSchedule',
        }),
    },
    created() {
        const monday = getMonday();
        const sunday = getSunday();
        const week = getWeek(monday);
    },
};
</script>

<style lang="scss">
    @import '~@/assets/style/main.scss';

    .main-page {
        font-family: SourceSansPro, sans-serif;
    }
</style>
