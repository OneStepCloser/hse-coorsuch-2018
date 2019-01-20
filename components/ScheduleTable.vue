<template>
    <div>
        <div v-for="(day, i) in week"
             :key="i"
             v-if="i !== 6">
            <table class="table centered">
                <thead>
                    <tr>
                        <th colspan="3"
                            :class="{ 'today-head': today === dateForRequest(day)}">
                            <span class="day-of-week">{{ `${weekDict[i]}` }}</span><span>{{ `, ${addLeadingZeros(day.getDate())}.${addLeadingZeros(day.getMonth() + 1)}.${day.getFullYear()}` }}
                            </span>
                        </th>

                    </tr>
                </thead>

                <tbody>
                    <tr v-if="!personalSchedule.hasOwnProperty(dateForRequest(day))">
                        <td class="no-lessons"
                            :class="{ 'today-row': today === dateForRequest(day)}"
                            colspan="3">Занятий нет
                        </td>
                    </tr>

                    <tr v-else
                        v-for="lesson in personalSchedule[dateForRequest(day)]">
                        <td class="duration"
                            :class="{ 'today-row': today === dateForRequest(day)}">
                            {{ `${lesson.beginLesson} - ${lesson.endLesson}` }}
                        </td>
                        <td class="auditorium"
                            :class="{ 'today-row': today === dateForRequest(day)}">{{ `ауд. ${lesson.auditorium}` }}</td>
                        <td class="info"
                            :class="{ 'today-row': today === dateForRequest(day)}">
                            <div class="kind">{{ lesson.kindOfWork }}</div>
                            <div class="discipline">{{ lesson.discipline }}</div>
                            <div class="lecturer">{{ lesson.lecturer }}</div>
                            <div class="building">{{ lesson.building }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { addLeadingZeros, dateForRequest } from '~/assets/js/utils';

export default {
    name: 'ScheduleTable',
    props: {
        week: {
            type: Array,
            default() {
                return [];
            },
        },
        personalSchedule: {
            type: Object,
            default() {
                return {};
            },
        },
        today: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            weekDict: [
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
                'Воскресенье',
            ],
        };
    },
    methods: {
        addLeadingZeros(number) {
            return addLeadingZeros(number, 2);
        },
        dateForRequest(date) {
            return dateForRequest(date);
        },
    },
    created() {
        // console.log('lolkek', this.personalSchedule);
    },
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .table {
        width: 70%;
        margin-top: 20px;
        margin-bottom: 40px;
        border-spacing: 0;
        table-layout: auto;
        font-size: 1.2em;
        font-weight: 300;

        @media (max-width: 600px) {
            width: 90%;
        }

        th {
            background-color: $accent-color-lightest;
            padding: 5px;
            font-size: 1.2em;
            color: $dark-color;
            font-weight: 400;
        }

        tr {
            .day-of-week {
                font-weight: 700;
            }
        }

        td {
            padding: 5px;
            border-bottom: solid 1px $accent-color-light;
        }

        .duration {
            width: 13ch;
            text-align: center;

            @media (max-width: 550px) {
                width: 7ch;
                font-size: 0.8em;
            }
        }

        .auditorium {
            width: 10ch;
            text-align: center;

            @media (max-width: 550px) {
                width: 4ch;
                font-size: 0.8em;
            }
        }

        .info {
            @media (max-width: 550px) {
                font-size: 0.8em;
            }
            .discipline {
                font-size: 1.2em;
                font-weight: 400;
            }

            .building {
                color: $dark-color;
                font-size: 0.8em;
            }

            .lecturer {
                margin-top: 10px;
            }

        }

        .no-lessons {
            text-align: center;
        }

        .today-row {
            background-color: $attention-color-transparent;
            border-bottom: solid 1px $attention-color;
        }

        .today-head {
            background-color: $attention-color;
            color: $text-color-light;
        }
    }
</style>
