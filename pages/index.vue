<template>
    <div class="schedule">
        <h2>Расписание занятий</h2>


        <div v-if="personalSchedule !== -1">
            <div class="pages-container centered">
                <a class="link clickable"
                   @click="anotherWeek(false)">
                    <img :src="require('@/assets/image/icons/arrow-left.svg')"
                         class="arrow-left clickable">
                    <span>Предыдущая&nbsp;неделя</span></a>
                <div class="current-week centered-text">
                    {{ `${addLeadingZeros(monday.getDate())}&nbsp;${monthDict[monday.getMonth()]}&nbsp;${monday.getFullYear()}&nbsp;-
                    ${addLeadingZeros(sunday.getDate())}&nbsp;${monthDict[sunday.getMonth()]}&nbsp;${sunday.getFullYear()}`
                    }}
                </div>
                <a class="link clickable"
                   @click="anotherWeek(true)"><span>Следующая&nbsp;неделя</span>
                    <img :src="require('@/assets/image/icons/arrow-right.svg')"
                         class="arrow-right clickable"></a>
            </div>

            <button class="current-week-button clickable centered-text"
                    @click="goToCurrentWeek">Вернуться к текущей неделе
            </button>

            <transition name="fade">
                <schedule-table v-if="!loading"
                                :week="week"
                                :personal-schedule="isDefault ? personalSchedule : nonDefaultSchedule"
                                :today="todayKey"
                                class="schedule-table"/>
            </transition>

        </div>
        <div v-else-if="!storeLoading"
             class="no-logged-message centered">
            Для просмотра расписания необходимо ввести корпоративную почту.
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
        todayKey() {
            return dateForRequest(new Date(currentDay));
        },
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

            this.isDefault = false; // now showing non-current week
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
                })
                .catch((error) => {
                    console.log('ERROR', error);
                });
        },
        goToCurrentWeek() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 500);

            this.today = new Date(currentDay); // TODO
            this.monday = getMonday(this.today);
            this.sunday = getSunday(this.today);
            this.week = getWeek(this.monday);

            this.isDefault = true;
            // console.log('GO TO CURRENT', this.personalSchedule);
        },

    },
    created() {
        this.today = new Date(currentDay); // TODO
        this.monday = getMonday(this.today);
        this.sunday = getSunday(this.today);
        this.week = getWeek(this.monday);
    },
    watch: {
        emailFromStore() {
            // console.log('OLD', oldEmail, 'NEW', newEmail);
            const today = new Date(currentDay); // TODO
            const monday = getMonday(today);
            const sunday = getSunday(today);

            this.loading = true;

            // if email in local storage (and subsequently in store) is changed, renew schedule table
            this.$store.dispatch('loadPersonalSchedule', { fromDate: dateForRequest(monday), toDate: dateForRequest(sunday) })
                .then(() => {
                    if (!this.isDefault) { // if later was shown non-current week get personal schedule for this week
                        getPersonalSchedule(
                            this.dateForRequest(this.monday), this.dateForRequest(this.sunday),
                            this.$store.getters.email,
                        ) // TODO handle wrong email
                            .then((response) => {
                                if (response.data.query.results === null) {
                                    this.nonDefaultSchedule = {}; // no lessons, return empty object
                                } else {
                                    this.nonDefaultSchedule = _.groupBy(
                                        response.data.query.results.json.json,
                                        lesson => lesson.date,
                                    );
                                }

                                this.loading = false;
                            })
                            .catch((error) => {
                                console.log('ERROR', error);
                            });
                    }
                    this.loading = false;
                });


        },
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
            padding: 0 15%;
            color: $attention-color;
            font-family: Raleway, sans-serif;
            font-size: 2em;
            font-weight: 700;

            @media (max-width: 600px) {
                padding: 0 5%;
            }
        }

        .pages-container {
            width: 70%;
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

                &:hover, &:focus {
                    color: $text-color-dark;
                    //text-decoration: underline;
                }

                span {
                    @media (max-width: 760px) {
                        display: none;
                    }
                }
            }

            .current-week {
                font-size: 1.5em;
                padding: 0 20px;

            }
        }

        .no-logged-message {
            width: 70%;
            font-size: 1.5em;
            margin-top: 20px;
            margin-bottom: 40px;

            @media (max-width: 600px) {
                width: 90%;
            }
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

        .current-week-button {
            display: block;
            padding: 10px 15px;
            margin: 20px auto 0 auto;
            //width: 100%;
            //border: none;
            outline: none;
            //border-bottom: 1px solid $attention-color;
            //border-top: 1px solid $attention-color;
            color: $attention-color;
            transition: background-color, .5s;
            outline: none;
            background-color: $text-color-light;
            border: solid $attention-color-transparent 1px;
            border-radius: 2px;

            &:hover {
                background-color: $attention-color-transparent;
            }

        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter-to {
        opacity: 1;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
