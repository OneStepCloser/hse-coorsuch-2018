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

        <div v-if="personalSchedule !== -1">
            <div class="pages-container centered">
                <a class="link clickable">
                    <img src="/img/arrow-left.svg"
                    class="arrow-left">
                    Предыдущая&nbsp;неделя</a>
                <div class="current-week centered-text">
                    {{ `${addLeadingZeros(monday.getDate())}&nbsp;${monthDict[monday.getMonth()]}&nbsp;${monday.getFullYear()}&nbsp;-
                    ${addLeadingZeros(sunday.getDate())}&nbsp;${monthDict[sunday.getMonth()]}&nbsp;${sunday.getFullYear()}` }}
                </div>
                <a class="link clickable">Следующая&nbsp;неделя
                    <img src="/img/arrow-right.svg"
                         class="arrow-right"></a>

            </div>
            <div v-for="(day, i) in week"
                 :key="i">
                <table class="table centered">
                    <thead>
                        <tr>
                            <th colspan="3"><b>{{ `${weekDict[i]}` }}</b>
                            {{ `, ${addLeadingZeros(day.getDate())}.${addLeadingZeros(day.getMonth() + 1)}.${day.getFullYear()}` }}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="!personalSchedule.hasOwnProperty(dateForRequest(day))">
                            <td class="no-lessons"
                                colspan="3">Занятий нет</td>
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
        <div v-else
            class="no-logged-message centered">
            Для просмотра расписания необходимо ввести корпоративную почту (правый верхний угол).
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { getMonday, getWeek, getSunday, dateForRequest, addLeadingZeros } from '~/utils';

export default {
    name: 'Index',
    layout: 'default',
    data() {
        return {
            week: [],
            weekDict: [
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
                'Воскресенье',
            ],
            monthDict: [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря',
            ],
            today: -1,
            monday: -1,
            sunday: -1,
            isDefault: true,
            nonDefaultSchedule: -1,
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
        addLeadingZeros(number) {
            return addLeadingZeros(number, 2);
        },
    },
    created() {
        this.today = new Date(2018, 3, 20); // TODO
        this.monday = getMonday(this.today);
        this.sunday = getSunday(this.today);
        this.week = getWeek(this.monday);
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
            width: 60%;
            margin-top: 20px;
            margin-bottom: 40px;
            border-spacing: 0;
            table-layout: fixed;
            font-size: 1.2em;
            font-weight: 300;

            th {
                background-color: $accent-color-lightest;
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

        .pages-container {
            width: 60%;
            display: flex;
            justify-content: space-between;

            .link {
                font-size: 1.2em;
                color: $dark-color;
                text-decoration: none;
                display: flex;

                img {
                    width: 10px;
                    height: 20px;

                    &.arrow-left {
                        margin-right: 10px;
                    }

                    &.arrow-right {
                        margin-left: 10px;
                    }
                }



                &:hover {
                    color: $text-color-dark;
                    //text-decoration: underline;
                }
            }

            .current-week {
                font-size: 1.5em;
            }
        }

        .no-logged-message {
            width: 60%;
            font-size: 1.5em;
            margin-top: 20px;
            margin-bottom: 40px;
        }
    }
</style>
