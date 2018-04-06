<template>
    <div class="schedule">
        <h2>Расписание занятий</h2>

        <div v-if="personalSchedule !== -1">
            <div class="pages-container centered">
                <a class="link clickable"
                   @click="anotherWeek(false)">
                    <img src="/img/arrow-left.svg"
                         class="arrow-left">
                    Предыдущая&nbsp;неделя</a>
                <div class="current-week centered-text">
                    {{ `${addLeadingZeros(monday.getDate())}&nbsp;${monthDict[monday.getMonth()]}&nbsp;${monday.getFullYear()}&nbsp;-
                    ${addLeadingZeros(sunday.getDate())}&nbsp;${monthDict[sunday.getMonth()]}&nbsp;${sunday.getFullYear()}`
                    }}
                </div>
                <a class="link clickable"
                   @click="anotherWeek(true)">Следующая&nbsp;неделя
                    <img src="/img/arrow-right.svg"
                         class="arrow-right"></a>
            </div>

            <schedule-table v-if="!loading"
                            :week="week"
                            :personal-schedule="isDefault ? personalSchedule : nonDefaultSchedule"/>

        </div>
        <div v-else-if="!storeLoading"
             class="no-logged-message centered">
            Для просмотра расписания необходимо ввести корпоративную почту (правый верхний угол).
        </div>
        <div class="spinner"
             v-if="loading || storeLoading">
            <looping-rhombuses-spinner
                :animation-duration="2500"
                :rhombus-size="15"
                color="#836a9b"/>
            <span>Немного терпения...</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { getMonday, getWeek, getSunday, dateForRequest, addLeadingZeros, getPersonalSchedule } from '~/assets/js/utils';
import ScheduleTable from '~/components/ScheduleTable';
import { LoopingRhombusesSpinner } from '~/node_modules/epic-spinners';
import { currentDay } from '~/assets/js/static_data';
import _ from '~/node_modules/lodash';

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
            storeLoading: 'loading',
            emailFromStore: 'email',
        }),
    },
    methods: {
        dateForRequest(date) {
            return dateForRequest(date);
        },
        addLeadingZeros(number) {
            return addLeadingZeros(number, 2);
        },
        anotherWeek(isNext) {
            this.monday.setHours((isNext || -1) * 24 * 7);
            this.sunday.setHours((isNext || -1) * 24 * 7);
            this.week = getWeek(this.monday);

            this.isDefault = false;

            // console.log('BEFORE REQUEST');

            this.loading = true;
            getPersonalSchedule(this.dateForRequest(this.monday), this.dateForRequest(this.sunday), this.$store.getters.email)
                .then((response) => {
                    if (response.data.query.results === null) {
                        this.nonDefaultSchedule = {};
                    } else {
                        this.nonDefaultSchedule = _.groupBy(
                            response.data.query.results.json.json,
                            lesson => lesson.date,
                        );
                    }

                    this.loading = false;
                    // console.log('NOW SCHEDULE: ', this.nonDefaultSchedule);
                })
                .catch((error) => {
                    // console.log('ERROR', error);
                });
        },
    },
    watch: {
        emailFromStore(newEmail, oldEmail) {
            // console.log('OLD', oldEmail, 'NEW', newEmail);
            const today = new Date(currentDay); // TODO
            const monday = getMonday(today);
            const sunday = getSunday(today);

            this.loading = true;
            this.$store.dispatch('loadPersonalSchedule', { fromDate: dateForRequest(monday), toDate: dateForRequest(sunday) })
                .then((response) => {
                    if (!this.isDefault) {
                        //console.log('MONDAY IS', this.monday, 'SUNDAY IS', this.sunday);
                        getPersonalSchedule(this.dateForRequest(this.monday), this.dateForRequest(this.sunday), this.$store.getters.email)
                            .then((response) => {
                                if (response.data.query.results === null) {
                                    this.nonDefaultSchedule = {};
                                } else {
                                    this.nonDefaultSchedule = _.groupBy(
                                        response.data.query.results.json.json,
                                        lesson => lesson.date,
                                    );
                                }

                                this.loading = false;
                                // console.log('NOW SCHEDULE: ', this.nonDefaultSchedule);
                            })
                            .catch((error) => {
                                console.log('ERROR', error);
                            });
                    }
                    this.loading = false;
                });


        },
    },
    created() {
        this.today = new Date(currentDay); // TODO
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
            color: $attention-color;
            font-family: Raleway, sans-serif;
            font-size: 2em;
            font-weight: 700;
        }

        .pages-container {
            width: 60%;
            display: flex;
            justify-content: space-between;
            align-items: center;

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
