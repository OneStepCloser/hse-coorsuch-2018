<template>
    <div>
        <div v-show="!emailExists && show"
             class="not-logged centered-text">
            <div class="text">Чтобы наш сервис был ещё удобнее, введите адрес корпоративной почты</div>
            <div class="container">
                <form @submit.prevent="saveEmail">
                    <input class="input"
                           placeholder="slzakharov@edu.hse.ru"
                           v-model="inputedEmail"
                           @focus="emailIsInputed"
                           type="email"
                           name="email"
                           autocomplete="on">
                    <button class="button clickable"
                            @click="saveEmail">Готово!
                    </button>
                </form>
            </div>
            <div class="error"
                 :class="{ 'error_visible': invalidEmail }">Введенный e-mail не является корпоративным
            </div>
            <img src="/img/close.svg"
                 class="close clickable"
                 @click="close">
        </div>
    </div>
</template>

<script>
import { checkEmail } from '~/assets/js/utils';
import { mapGetters } from '~/node_modules/vuex';

export default {
    name: 'NotLoggedBlock',
    data() {
        return {
            email: '',
            invalidEmail: false,
            show: true,
        };
    },
    computed: {
        inputedEmail: {
            get() {
                return this.email;
            },
            set(value) {
                this.email = value;
            },
        },
        ...mapGetters({
            emailFromStore: 'email',
            emailExists: 'emailExists',
        }),
    },
    methods: {
        saveEmail() {
            if (process.browser) {
                if (checkEmail(this.email)) {
                    window.localStorage.setItem('kovtoroiEmail', this.email);
                    this.$store.dispatch('loadEmailFromLocalStorage');


                } else {
                    this.invalidEmail = true;
                }
            }
        },
        emailIsInputed() {
            this.invalidEmail = false;
        },
        close() {
            this.show = false;
        },

    },

};

</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .not-logged {
        background-color: $attention-color;
        padding: 20px 15%;

        @media (max-width: 505px) {
            padding: 20px 5%;
        }

        .text {
            font-size: 1.3em;
            color: $text-color-light;
        }

        .container {
            margin-bottom: 5px;

            .input {
                padding: 8px 15px;
                outline: none;
                border-radius: 2px;
                font-size: 1.2em;
                margin-top: 15px;
                margin-right: 15px;
                border: 1px solid transparent;
                transition-property: border, box-shadow;
                transition-duration: .5s, .5s;

                @media (max-width: 380px) {
                    width: 90%;
                }

                &:focus {
                    box-shadow: 0 0 10px $accent-color-light;
                    border: 1px solid $accent-color-light;
                }
            }

            .button {
                padding: 10px 15px;
                border-radius: 2px;
                border: 1px solid $text-color-light;
                background-color: transparent;
                color: $text-color-light;
                transition: background-color, .5s;
                outline: none;
                margin-top: 15px;

                @media (max-width: 380px) {
                    width: 100%;
                }

                &:hover {
                    background-color: $light-very-transparent-color;
                }
            }
        }

        .close {
            width: 15px;
            height: 15px;
            position: absolute;
            top: 20px;
            right: calc(15% - 23px);

            @media (max-width: 505px) {
                top: 10px;
                right: 10px;
            }
        }

        .error {
            color: #ff878b;
            display: none;

            &_visible {
                display: unset;
            }
        }

    }


</style>
