<template>
    <div class="freerooms">
        <div class="container">
            <multiselect v-model="chosenBuilding"
                         :options="buildings"
                         :label="'address'"
                         placeholder="Введите или выберите адрес корпуса"
                         @input="buildingIsInputing"
                         :class="{ 'select_skipped': !buildingIsChosen }"
                         class="select"
            />
            <!--<el-select v-model="buildingId"-->
            <!--placeholder="Введите или выберите адрес корпуса"-->
            <!--class="select"-->
            <!--:class="{ 'select_skipped': !buildingIsChosen }"-->
            <!--filterable-->
            <!--clearable-->
            <!--@focus="buildingIsInputing">-->
            <!--<el-option-->
            <!--v-for="building in buildings"-->
            <!--:key="building.buildingOid"-->
            <!--:value="building.buildingOid"-->
            <!--:label="building.address"/>-->
            <!--</el-select>-->
            <div class="error centered-text"
                 :class="{ 'error_visible': !buildingIsChosen }">Вы забыли ввести корпус!
            </div>
            <el-date-picker
                v-model="date"
                type="date"
                placeholder="Выберите день"
                format="dd.MM.yyyy"
                class="date-field"
                :picker-options="pickerOptions"/>
            <el-select v-model="lessonNumber"
                       placeholder="Номер пары"
                       class="lesson-field">
                <el-option
                    v-for="(lesson, i) in lessons"
                    :key="i + 1"
                    :value="i + 1"
                    :label="lesson.label"/>
            </el-select>
            <button class="go-button clickable"
                    @click="showFreeRooms">Стартуем!
            </button>
        </div>
        <div class="spinner"
             v-if="loading">
            <looping-rhombuses-spinner
                :animation-duration="2500"
                :rhombus-size="15"
                color="#836a9b"
            />
            <span>Немного терпения...</span>
        </div>

        <transition name="fade">
            <free-rooms-table :rooms="freeRooms"
                              v-if="freeRooms && freeRooms.length > 0 && !loading"
                              key="1"/>
            <div v-else-if="freeRooms === -1 && !loading"
                 class="tip centered-text"
                 key="2">Заполните поля выше и нажмите на кнопку "Стартуем!"
            </div>
            <div v-else-if="!loading"
                 class="empty-list centered-text"
                 key="3">Кажется, свободных аудиторий нет 😭
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from '~/node_modules/vuex';
import { dateForRequest } from '~/assets/js/utils';
import FreeRoomsTable from '~/components/FreeRoomsTable';
import { LoopingRhombusesSpinner } from '~/node_modules/epic-spinners';

export default {

    name: 'Freerooms',
    data() {
        return {
            buildingId: '',
            buildingIsChosen: true,
            lessonNumber: '',
            date: '',
            loading: false,
            lessons: [
                { label: '1 пара (9:00 - 10:20)', startHour: 9, startMinute: 0, endHour: 10, endMinute: 20 },
                { label: '2 пара (10:30 - 11:50)', startHour: 10, startMinute: 20, endHour: 11, endMinute: 50 },
                { label: '3 пара (12:10 - 13:30)', startHour: 11, startMinute: 50, endHour: 13, endMinute: 30 },
                { label: '4 пара (13:40 - 15:00)', startHour: 13, startMinute: 30, endHour: 15, endMinute: 0 },
                { label: '5 пара (15:10 - 16:30)', startHour: 15, startMinute: 0, endHour: 16, endMinute: 30 },
                { label: '6 пара (16:40 - 18:00)', startHour: 16, startMinute: 30, endHour: 18, endMinute: 0 },
                { label: '7 пара (18:10 - 19:30)', startHour: 18, startMinute: 0, endHour: 19, endMinute: 30 },
                { label: '8 пара (19:40 - 21:00)', startHour: 19, startMinute: 30, endHour: 21, endMinute: 0 },
            ],
            selected: '',
            pickerOptions: {
                firstDayOfWeek: 1,
            },
        };
    },
    computed: {
        chosenBuilding: {
            get() {
                return _.find(this.buildings, ({ buildingOid }) => buildingOid === this.buildingId);
            },
            set(val) {
                if (val && val.buildingOid !== undefined) {
                    this.buildingId = val.buildingOid;
                } else {
                    this.buildingId = '';
                }
            },
        },
        ...mapGetters({
            buildings: 'getBuildings',
            freeRooms: 'freeRooms',
            preferedBuilding: 'preferedBuilding',
        }),
        // dateForRequest() {
        //     const year = this.date.getFullYear();
        //     const month = addLeadingZeros(this.date.getMonth() + 1, 2);
        //     const date = addLeadingZeros(this.date.getDate(), 2);
        //     return `${year}-${month}-${date}`;
        // },
    },
    methods: {
        showFreeRooms() {
            if (this.buildingId === '') {
                this.buildingIsChosen = false;
                return;
            }
            if (process.browser) {
                window.localStorage.setItem('kovtoroiBuilding', this.buildingId);
            }
            // console.log('BUILDING', this.buildingId);
            this.loading = true;
            // console.log('LOADING1', this.loading);
            this.$store.dispatch('loadFreeRooms', { date: dateForRequest(this.date), buildingId: this.buildingId, lessonNumber: this.lessonNumber })
                .then(() => {
                    this.loading = false;
                });
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
            start.setHours(lesson.startHour);
            start.setMinutes(lesson.startMinute);
            end.setHours(lesson.endHour);
            end.setMinutes(lesson.endMinute);

            return start <= targetMoment && targetMoment <= end;
        },
        buildingIsInputing() {
            this.buildingIsChosen = true;
        },

    },
    created() {
        this.date = new Date();
        this.lessonNumber = this.currentPair();
        if (process.browser && window.localStorage.kovtoroiBuilding) {
            this.buildingId = Number(window.localStorage.kovtoroiBuilding);
        }
    },
    components: { FreeRoomsTable, LoopingRhombusesSpinner },
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

    .multiselect {
        @media (max-width: 660px) {
            width: unset;
        }
    }

    .multiselect__tags {
        border-color: #dbdde6;
        padding-left: 10px;

    }

    .multiselect__single {
        //color: #c0c4cc;

    }

    .multiselect--active {
        .multiselect__select {
            transform: rotate(0deg);
        }

        .multiselect__tags {
            border-color: $accent-color;
        }
    }

    .multiselect__option::after {
        display: none;
    }

    .multiselect__option--highlight {
        background-color: $accent-color;
        &.multiselect__option--selected {
            background-color: $attention-color;
        }
    }

    .multiselect__select {
        padding-right: 0;
        padding-left: 0;
        width: 25px;
        margin-right: 5px;
        transform: rotate(180deg);
        &::before {
            color: #c0c4cc;
            content: "\E605";
            font-family: 'element-icons' !important;
            border: none;
            top: 6px;
            font-size: 14px;
        }
    }

</style>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .freerooms {
        padding: 20px 15%;

        @media (max-width: 600px) {
            padding: 20px 5%;

        }

        .container {
            display: flex;
            flex-wrap: wrap;
            margin-left: -20px;

            @media (max-width: 660px) {
                flex-direction: column;
            }

            & > * {
                margin-left: 20px;
                margin-bottom: 15px;
            }

            .select {
                flex-grow: 1;
                flex-basis: 100%;

                &_skipped {
                    margin-bottom: 2px;
                }
            }

            .date-field, .lesson-field {
                flex-shrink: 1;
                flex-grow: 0;
                flex-basis: 33%;

                @media (max-width: 660px) {
                    width: calc(100% - 20px);
                }
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

            .error {
                flex-basis: 100%;
                color: red;
                display: none;

                &_visible {
                    display: unset;
                }
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
    }

    .option-content {
        padding: 10px;
        white-space: normal;
        line-height: 1.5em;
    }

    .tip, .empty-list {
        margin-top: 30px;
        font-size: 1.3em;
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
