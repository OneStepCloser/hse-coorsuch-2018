<template>
    <div class="site-header">
        <div class="title-container">
            <img :src="require('@/assets/image/icons/logo2.svg')">
            <h1 class="name">Ко второй</h1>
        </div>
        <div class="menu-container">
            <nuxt-link class="link"
                       to="/"
                       active-class="link_active"
                       exact>
                <span>Расписание</span>
                <div class="menu-icon menu-icon-schedule"/>
            </nuxt-link>
            <nuxt-link class="link"
                       to="/freerooms"
                       active-class="link_active"
                       exact>
                <span>Свободные аудитории</span>
                <div class="menu-icon menu-icon-rooms"/>
            </nuxt-link>

            <div class="avatar clickable tooltip-target"
                 :class="{ 'not-logged': !emailExists }"
                 @click="togglePopover"
                 v-popover:popover>
                <span class="initials">{{ initials }}</span>
                <img class="arrow-down clickable"
                     :src="require('@/assets/image/icons/arrow-down.svg')">

            </div>

            <el-popover
                ref="popover"
                placement="bottom-end"
                v-model="showPopover">

                <div class="popover-label">Введите адрес корпоративной почты:</div>
                <form @submit.prevent="changeEmail">
                    <div class="form-container">


                        <input v-model="emailFromStorage"
                               @focus="emailIsInputed"
                               class="input"
                               placeholder="aaivanov@edu.hse.ru"
                               type="email"
                               name="email"
                               autocomplete="on">
                        <button class="button clickable"
                                @click="changeEmail">
                            Готово!
                        </button>

                    </div>
                </form>
                <div class="error"
                     :class="{ 'error_visible': invalidEmail }">Введенный e-mail не является корпоративным
                </div>
            </el-popover>

        </div>
    </div>
</template>

<script>
import { checkEmail } from '~/assets/js/utils';
import { mapGetters } from '~/node_modules/vuex';
import { sendReachGoal } from '~/nuxt_plugins/YandexMetrika/ABtest';

export default {
    name: 'SiteHeader',
    data() {
        return {
            email: '',
            invalidEmail: false,
            showPopover: false,
        };
    },
    computed: {
        emailFromStorage: {
            get() {
                return this.$store.getters.email === -1 ? '' : this.$store.getters.email;
            },
            set(value) {
                this.email = value;
            },
        },
        initials() {
            const email = this.$store.getters.email;
            return email === -1 ? '' : email[0] + email[2];
        },
        ...mapGetters({
            emailExists: 'emailExists',
        }),
    },
    methods: {
        changeEmail() {
            if (process.browser) {
                if (checkEmail(this.email)) {
                    window.localStorage.setItem('kovtoroiEmail', this.email);
                    sendReachGoal(this);
                    this.$store.dispatch('loadEmailFromLocalStorage');
                    this.showPopover = false;
                } else {
                    this.invalidEmail = true;
                }
            }
        },
        emailIsInputed() {
            this.invalidEmail = false;
        },
        togglePopover() {
            this.showPopover = !this.showPopover;
        },
    },
    created() {
        this.email = this.$store.getters.email;
    },
};
</script>
<style lang="scss">
    @import '~@/assets/style/_colors.scss';
    @import '~@/assets/style/_popover.scss';

    .vue-popover {
        top: 45px !important;
        width: unset !important;
        right: -25px !important;
        left: unset !important;
        background: $attention-color !important;
        padding: 15px;
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);

        &::before {
            right: 5px !important;
            left: unset !important;
            border-bottom: 6px solid $attention-color !important;
        }
    }

    .el-popover {
        background-color: $attention-color;
        border-color: $attention-color;

        .popper__arrow {
            border-bottom-color: $attention-color !important;
            &::after {
                border-bottom-color: $attention-color !important;
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .site-header {
        background-color: $accent-color;
        height: 60px;
        padding: 0 15%;
        position: relative;

        @media (max-width: 965px) {
            padding: 0 5% 0 15%;
        }

        @media (max-width: 600px) {
            padding: 0 calc(5% + 25px) 0 5%;
        }

        /*@media (max-width: 735px) {*/
        /*padding: 0 5% 0 15%;*/
        /*}*/

        .title-container {
            float: left;
            display: flex;
            align-items: center;
            height: 100%;

            img {
                width: 45px;
                height: 45px;
            }

            .name {
                font-family: Raleway, sans-serif;
                color: $dark-color;
                margin: 0 0 0 10px;
                font-size: 35px;
                font-weight: 900;

                @media (max-width: 535px) {
                    display: none;
                }
            }
        }

        .menu-container {
            display: flex;
            align-items: center;
            float: right;

            .link {
                line-height: 60px;
                padding: 0 15px;
                color: $dark-color;
                text-transform: uppercase;
                text-decoration: none;
                transition: background-color, .5s;
                font-weight: 500;
                letter-spacing: 0.1em;
                display: flex;
                align-items: stretch;

                &:hover {
                    background-color: $accent-color-light;
                }

                &:active {

                }

                span {
                    @media (max-width: 830px) {
                        display: none;
                    }
                }

                .menu-icon-wrapper {
                    height: 100%;
                }

                .menu-icon {
                    width: 35px;
                    height: 60px;
                    background-size: 25px 25px;
                    background-repeat: no-repeat;
                    background-position: center;
                    display: none;

                    &-schedule {
                        background-image: url(/assets/image/icons/schedule.svg);
                    }

                    &-rooms {
                        background-image: url(/assets/image/icons/door.svg);
                    }

                    @media (max-width: 830px) {
                        display: block;
                    }
                }
            }

            .link_active {
                background-color: $accent-color-light;
            }

            .avatar {
                background-color: $dark-transparent-color;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                color: $text-color-light;
                text-align: center;
                font-family: Raleway, sans-serif;
                font-size: 1.5em;
                font-weight: 700;
                margin-left: 25px;
                overflow: visible;
                position: relative;
                outline: none;

                @media (max-width: 535px) {
                    margin-left: 10px;
                }

                .initials {
                    line-height: 45px;
                    text-transform: uppercase;
                }

                .arrow-down {
                    width: 20px;
                    height: 10px;
                    position: absolute;
                    right: -25px;
                    top: calc(50% - 5px);
                }
            }
        }
    }

    .form-container {
        display: flex;

        .input {
            padding: 8px 15px;
            outline: none;
            border-radius: 2px;
            //font-size: 0.8em;
            //margin-top: 15px;
            margin-right: 15px;
            border: 1px solid transparent;
            transition-property: border, box-shadow;
            transition-duration: .5s, .5s;

            &:focus {
                box-shadow: 0 0 10px $accent-color-light;
                border: 1px solid $accent-color-light;
            }
        }

        .button {
            display: block;
            padding: 0px 15px;
            border-radius: 2px;
            border: 1px solid $text-color-light;
            background-color: transparent;
            color: $text-color-light;
            transition: background-color, .5s;
            outline: none;
            //font-size: 0.6em;
            line-height: unset;

            &:hover {
                background-color: $light-very-transparent-color;
            }
        }
    }

    .error {
        color: #ff878b;
        display: none;
        font-family: SourceSansPro, sans-serif;
        font-weight: 500;
        //font-size: 0.7em;
        text-transform: unset;
        padding-top: 5px;

        &_visible {
            display: block;
        }
    }

    .not-logged {
        background-image: url(/assets/image/icons/unknown-user.svg);
        background-size: 60%;
        background-position: 60% 50%;
        background-repeat: no-repeat;

    }

    .popover-label {
        color: $text-color-light;
        margin-bottom: 10px;
    }

    .show-enter-active, .show-leave-active {
        transition: transform 1s, opacity 0.7s;
    }

    .show-enter, .show-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }

    /*.show-enter-active, .show-leave-active {*/
    /*transition: opacity 0.8s;*/
    /*}*/

    /*.show-enter-to {*/
    /*opacity: 1;*/
    /*}*/

    /*.show-enter, .show-leave-to {*/
    /*opacity: 0;*/
    /*}*/
</style>
