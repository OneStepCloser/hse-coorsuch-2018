<template>
    <div>
        <div v-for="(day, i) in week"
             :key="i"
             v-if="i !== 6">
            <table class="table centered">
                <thead>
                    <tr>
                        <th colspan="3">
                            <span class="day-of-week">{{ `${weekDict[i]}` }}</span><span>{{ `, ${addLeadingZeros(day.getDate())}.${addLeadingZeros(day.getMonth() + 1)}.${day.getFullYear()}` }}
                            </span>
                        </th>

                    </tr>
                </thead>

                <tbody>
                    <tr v-if="!personalSchedule.hasOwnProperty(dateForRequest(day))">
                        <td class="no-lessons"
                            colspan="3">Занятий нет</td>
                    </tr>

                    <tr v-else
                        v-for="lesson in personalSchedule[dateForRequest(day)]">
                        <td class="duration">
                            {{ `${lesson.beginLesson} - ${lesson.endLesson}` }}
                        </td>
                        <td class="auditorium">{{ `ауд. ${lesson.auditorium}` }}</td>
                        <td class="info">
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
import { addLeadingZeros, dateForRequest } from '~/utils';

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
        }

        .auditorium {
            width: 10ch;
            text-align: center;
        }

        .info {
            .discipline {
                font-size: 1.2em;
                font-weight: 400;
            }

            .building {
                color: $dark-color;
                font-size: 0.8em;
            }

        }

        .no-lessons {
            text-align: center;
        }
    }
</style>
