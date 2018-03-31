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
                <a class="link clickable"
                   @click="previousWeek">
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

            <div class="spinner"
                 v-if="loading">
                <looping-rhombuses-spinner
                    :animation-duration="2500"
                    :rhombus-size="15"
                    color="#836a9b"/>
                <span>Немного терпения...</span>
            </div>

            <schedule-table v-if="!loading"
                            :week="week"
                            :personal-schedule="isDefault ? personalSchedule : nonDefaultSchedule"/>

        </div>
        <div v-else
             class="no-logged-message centered">
            Для просмотра расписания необходимо ввести корпоративную почту (правый верхний угол).
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { getMonday, getWeek, getSunday, dateForRequest, addLeadingZeros, getPersonalSchedule } from '~/utils';
import ScheduleTable from '~/components/ScheduleTable';
import { LoopingRhombusesSpinner } from '~/node_modules/epic-spinners';

export default {

    name: 'Index',
    layout: 'default',
    data() {
        return {
            week: [],

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
            nonDefaultSchedule: {},
            loading: false,
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
        previousWeek() {
            this.monday.setHours(-24 * 7);
            this.sunday.setHours(24 * 7);
            this.week = getWeek(this.monday);

            this.isDefault = false;

            console.log('BEFORE REQUEST');

            this.loading = true;
            getPersonalSchedule(this.dateForRequest(this.monday), this.dateForRequest(this.sunday), this.$store.getters.email)
                .then((response) => {
                    this.nonDefaultSchedule = _.groupBy(response.data.query.results.json.json, lesson => lesson.date);
                    this.loading = false;
                    console.log('NOW SCHEDULE: ', this.nonDefaultSchedule);
                })
                .catch((error) => {
                    console.log('ERROR', error);
                });
        },
    },
    created() {
        this.today = new Date(2018, 3, 20); // TODO
        this.monday = getMonday(this.today);
        this.sunday = getSunday(this.today);
        this.week = getWeek(this.monday);
    },
    components: { ScheduleTable, LoopingRhombusesSpinner },
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

        .spinner {
            display: flex;
            justify-content: center;
            margin-top: 40px;

            span {
                margin-left: 10px;
                font-size: 1.3em;
            }
        }
    }
</style>
