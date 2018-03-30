<template>
    <div class="freerooms">
        <div class="container">
            <el-select v-model="buildingId"
                       placeholder="Введите или выберите адрес корпуса"
                       class="select"
                       filterable
                       clearable>
                <el-option
                    v-for="building in buildings"
                    :key="building.buildingOid"
                    :value="building.buildingOid"
                    :label="building.address"/>
            </el-select>
            <el-date-picker
                v-model="date"
                type="date"
                placeholder="Pick a day"/>
            <el-select v-model="lessonNumber"
                       placeholder="Номер пары">
                <el-option
                    v-for="(lesson, i) in lessons"
                    :key="i + 1"
                    :value="i + 1"
                    :label="lesson.label"/>
            </el-select>
            <button class="go-button clickable">Стартуем!</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';

export default {
    name: 'Freerooms',
    data() {
        return {
            buildingId: '',
            lessonNumber: '',
            date: '',
            // resultIsLoaded: true,
            lessons: [
                { label: '1 пара (9:00 - 10:20)', startHour: 9, startMinute: 0, endHour: 10, endMinute: 20 },
                { label: '2 пара (10:30 - 11:50)', startHour: 10, startMinute: 30, endHour: 11, endMinute: 50 },
                { label: '3 пара (12:10 - 13:30)', startHour: 12, startMinute: 10, endHour: 13, endMinute: 30 },
                { label: '4 пара (13:40 - 15:00)', startHour: 13, startMinute: 40, endHour: 15, endMinute: 0 },
                { label: '5 пара (15:10 - 16:30)', startHour: 15, startMinute: 10, endHour: 16, endMinute: 30 },
                { label: '6 пара (16:40 - 18:00)', startHour: 16, startMinute: 40, endHour: 18, endMinute: 0 },
                { label: '7 пара (18:10 - 19:30)', startHour: 18, startMinute: 10, endHour: 19, endMinute: 30 },
                { label: '8 пара (19:40 - 21:00)', startHour: 19, startMinute: 40, endHour: 21, endMinute: 0 },
            ],

        };
    },
    computed: {
        ...mapGetters({
            buildings: 'getBuildings',
        }),
    },
    methods: {
        getFilteredFreeRooms() {

        },

        currentPair() {
            const now = new Date();
            if (now.getDay() === 7) {
                return 1;
            }

            let res = 1;

            for (let i = 0; i < this.lessons.length; ++i) {
                if (this.belongsToLesson(this.lessons[i], now)) {
                    res = i + 1;
                    break;
                }
            }

            return res;
        },
        belongsToLesson(lesson, targetMoment) {
            const start = new Date();
            const end = new Date();
            console.log(lesson.startHour, lesson.startMinute, lesson.endHour, lesson.endMinute);
            start.setHours(lesson.startHour);
            start.setMinutes(lesson.startMinute);
            end.setHours(lesson.endHour);
            end.setMinutes(lesson.endMinute);

            return start <= targetMoment && targetMoment <= end;
        },
    },
    created() {
        this.date = new Date();
        this.lessonNumber = this.currentPair();
        // this.resultIsLoaded = false;
    },
};
</script>

<style lang="scss">
    @import '~@/assets/style/_colors.scss';

    .el-select-dropdown {
        width: 0;
    }

    .el-select-dropdown__item {
        height: unset;
    }

    .today > div > span {
        background-color: $dark-transparent-color;
        border-radius: 50%;
        color: $text-color-light !important;
    }
</style>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .freerooms {
        padding: 20px 15%;

        .container {
            display: flex;
            flex-wrap: wrap;
            margin-left: -20px;

            & > * {
                margin-left: 20px;
                margin-bottom: 15px;
            }

            .select {
                flex-grow: 1;
                flex-basis: 100%;
            }

            .go-button {
                padding: 10px 15px;
                border-radius: 2px;
                border: none;
                outline: none;
                background-color: $accent-color;
                color: $dark-color;
                transition: background-color, .5s;
                font-weight: 700;

                &:hover {
                    background-color: $accent-color-light;
                }

                &:focus {
                    background-color: $accent-color-light;
                    box-shadow: 0 0 10px $accent-color-light;
                }
            }
        }
    }

    .option-content {
        padding: 10px;
        white-space: normal;
        line-height: 1.5em;
    }

</style>
