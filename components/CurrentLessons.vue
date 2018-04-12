<template>
    <div>
        <div v-if="personalSchedule !== -1"
             class="current-pairs">

            <div v-if="nearestLessons">
                <div class="label">сейчас у вас:</div>
                <div class="next-container"
                     v-if="nearestLessons.current !== -1">
                    <span class="info time">{{ `${nearestLessons.current.beginLesson}` }}</span>
                    <div>
                        <span class="info info_important">{{ `${nearestLessons.current.kindOfWork}, ${nearestLessons.current.discipline} ` }}</span>
                        <span class="info">в ауд </span>
                        <span class="info info_important">{{ `${nearestLessons.current.auditorium}.` }}</span>
                    </div>
                </div>
                <div v-else
                class="info info_important">Нет пары</div>

                <div class="label">следующая пара:</div>
                <div class="next-container"
                     v-if="nearestLessons.next !== -1">
                    <span class="info time">{{ `${nearestLessons.next.beginLesson}` }}</span>
                    <div>
                        <span class="info info_important">{{ `${nearestLessons.next.kindOfWork}, ${nearestLessons.next.discipline} ` }}</span>
                        <span class="info">в ауд </span>
                        <span class="info info_important">{{ `${nearestLessons.next.auditorium}.` }}</span>
                    </div>
                </div>
                <div v-else
                     class="info info_important">Нет пары</div>
            </div>
            <div v-else class="no-lessons">
                <img src="/img/sunbed.svg"
                     class="no-lessons__image"/>
                <span>Ура, сегодня нет пар! Приятного отдыха!</span>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { currentDay } from '~/assets/js/static_data';
import { dateForRequest } from '~/assets/js/utils';

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
            let indexOfLesson = -1;
            let nextLessonIndex = -1;
            const todayKey = dateForRequest(now);

            if (!this.personalSchedule.hasOwnProperty(todayKey)) {
                return null;
            }

            const currentDaySchedule = this.personalSchedule[todayKey];

            for (let i = 0; i < currentDaySchedule.length; ++i) {
                const begin = new Date(`${todayKey} ${currentDaySchedule[i].beginLesson}`);
                const end = new Date(`${todayKey} ${currentDaySchedule[i].endLesson}`);

                // searching only if current lesson is not found yet
                if (indexOfLesson === -1 && begin.getTime() <= now.getTime() && now.getTime() <= end.getTime()) {
                    indexOfLesson = i;
                }

                // searching only if next lesson is not found yet
                if (nextLessonIndex === -1 && begin.getTime() >= now.getTime()) {
                    nextLessonIndex = i;
                }
            }


            return {
                current: indexOfLesson === -1 ? -1 : currentDaySchedule[indexOfLesson],
                next: nextLessonIndex === -1 ? -1 : currentDaySchedule[nextLessonIndex],
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

        @media (max-width: 600px) {
            padding: 15px 5%;
            font-size: 0.8em;
        }

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
            margin-right: 15px;
            font-size: 1.2em;
            font-weight: 500;
            border-radius: 5px;
            padding: 3px;
        }

        .next-container {
            display: flex;
            align-items: center;

            & > * {
                display: block;
            }
        }

        .no-lessons {
            color: $text-color-light;
            font-size: 1.5em;
            display: flex;
            align-items: center;
            justify-content: center;

            & > * {
                padding: 0 5px;
            }

            &__image {
                width: 45px;
                height: 45px;
            }
        }
    }
</style>
