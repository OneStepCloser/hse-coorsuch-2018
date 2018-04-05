<template>
    <div>
        <div v-if="personalSchedule !== -1"
             class="current-pairs">

            <div class="label">сейчас у вас:</div>
            <div class="next-container">
                <span class="info time">{{ `${nearestLessons.current.beginLesson}` }}</span>
                <div>
                    <span class="info info_important">{{ `${nearestLessons.current.kindOfWork}, ${nearestLessons.current.discipline} ` }}</span>
                    <span class="info">в ауд </span>
                    <span class="info info_important">{{ `${nearestLessons.current.auditorium}.` }}</span>
                </div>
            </div>

            <div class="label">следующая пара:</div>
            <div class="next-container">
                <span class="info time">{{ `${nearestLessons.next.beginLesson}` }}</span>
                <div>
                    <span class="info info_important">{{ `${nearestLessons.next.kindOfWork}, ${nearestLessons.next.discipline} ` }}</span>
                    <span class="info">в ауд </span>
                    <span class="info info_important">{{ `${nearestLessons.next.auditorium}.` }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { currentDay } from '~/assets/js/static_data';

export default {
    name: 'CurrentPairs',
    data() {
        return {
            lolkek: '',
        };
    },
    computed: {
        ...mapGetters({
            personalSchedule: 'personalSchedule',
            storeLoading: 'loading',
        }),
        nearestLessons() {
            const now = new Date(currentDay);
            // console.log('MY DATE', now);
            let indexOfDay = -1;
            let indexOfLesson = -1;

            for (const day of Object.keys(this.personalSchedule)) {
                for (let i = 0; i < this.personalSchedule[day].length; ++i) {
                    const begin = new Date(`${day} ${this.personalSchedule[day][i].beginLesson}`);
                    const end = new Date(`${day} ${this.personalSchedule[day][i].endLesson}`);
                    // console.log('BEGIN END', begin, end, now);
                    if (begin.getTime() <= now.getTime() && now.getTime() <= end.getTime()) {
                        indexOfDay = day;
                        indexOfLesson = i;
                    }
                }
                if (indexOfDay !== -1) {
                    break;
                }
            }
            return {
                current: indexOfDay === -1 ? -1 : this.personalSchedule[indexOfDay][indexOfLesson],
                next: indexOfDay === -1 ? -1
                    : (indexOfLesson === this.personalSchedule[indexOfDay].length - 1) ? -1
                        : this.personalSchedule[indexOfDay][indexOfLesson + 1],
            };
        },
    },
    created() {

    },


};
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .current-pairs {
        background-color: $dark-color;
        padding: 30px 15%;

        .label {
            color: $light-transparent-color;
            margin-bottom: 5px;

            &:not(:first-child) {
                margin-top: 10px;
            }
        }

        .info {
            font-size: 1.5em;
            color: $text-color-light;
            font-weight: 100;

            &_important {
                font-weight: 500;
            }
        }

        .time {
            background-color: $accent-color-lightest;
            color: $dark-color;
            margin-right: 7px;
            font-size: 1.2em;
            font-weight: 500;
            border-radius: 5px;
            padding: 3px;
        }

        .next-container {
            display: flex;
            align-items: baseline;

            & > * {
                display: block;
            }
        }
    }
</style>
