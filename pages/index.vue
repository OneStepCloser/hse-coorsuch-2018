<template>
    <div class="schedule">
        <!--<div v-for="day in personalSchedule">-->
        <!--<span>{{ day }}</span>-->
        <!--<br><br>-->
        <!--</div>-->
        <!--<br>-->
        <!--<br>-->
        <!--<br>-->
        <h2>Расписание занятий</h2>
        <div v-for="day in week">
            <table class="table centered">
                <thead>
                    <tr>
                        <th colspan="3">{{ `${day.getDate()}.${day.getMonth() + 1}.${day.getFullYear()}` }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="!personalSchedule.hasOwnProperty(dateForRequest(day))">
                        <td class="no-lessons">Занятий нет</td>
                    </tr>

                    <tr v-else
                        v-for="lesson in personalSchedule[dateForRequest(day)]">
                        <td class="duration">{{ `${lesson.beginLesson} - ${lesson.endLesson}` }}</td>
                        <td class="auditorium">{{ `ауд. ${lesson.auditorium}` }}</td>
                        <td class="info">
                            <div>{{ lesson.kindOfWork }}</div>
                            <div>{{ lesson.discipline }}</div>
                            <div>{{ lesson.lecturer }}</div>
                            <div>{{ lesson.building }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { getMonday, getWeek, dateForRequest, addLeadingZeros } from '~/utils';

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
    methods: {
        dateForRequest(date) {
            return dateForRequest(date);
        },
    },
    created() {
        const today = new Date(2018, 3, 8); // TODO
        const monday = getMonday(today);
        this.week = getWeek(monday);
    },
};
</script>

<style lang="scss">
    @import '~@/assets/style/main.scss';

</style>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .schedule {

        padding-bottom: 40px;

        h2 {
            padding: 0 20%;
            color: $accent-color;
            font-family: Raleway, sans-serif;
            font-size: 2em;
            font-weight: 700;
        }

        .table {
            min-width: 60%;
            margin-top: 20px;
            margin-bottom: 40px;
            border-spacing: 0;
            table-layout: fixed;
            font-size: 1.2em;
            font-weight: 300;

            th {
                background-color: $accent-color-lightest-extra;
                padding: 5px;
                font-size: 1.2em;
                color: $dark-color;
                font-weight: 400;
            }

            tr {

                //&:nth-child(even) {
                    //background-color: $accent-color-lightest-extra;
                //}

                //&:nth-child(odd) {
                    //background-color: $accent-color-lightest;
                //}
            }

            td {
                padding: 5px;
                border-bottom: solid 1px $accent-color-light;
            }

            .duration {
                width: 13ch;
                text-align: center;
            }

            .auditorium {
                width: 15ch;
                text-align: center;
            }

            .info {

            }

            .no-lessons {
                text-align: center;
            }
        }
    }
</style>
