<template>
    <div class="site-header">
        <div class="title-container">
            <img src="/img/logo2.svg">
            <h1 class="name">Ко второй</h1>
        </div>
        <div class="container">
            <nuxt-link class="link"
                       to="/"
                       active-class="link_active"
                       exact>Расписание</nuxt-link>
            <nuxt-link class="link"
                       to="/freerooms"
                       active-class="link_active"
                       exact>Свободные аудитории</nuxt-link>


            <div class="avatar clickable"
                 v-popover:login.bottom>ЗС
                <img class="arrow-down clickable"
                     src="/img/arrow-down.svg">
                <transition name="show">
                    <popover name="login">
                        <div class="container">
                            <input class="input"
                                   placeholder="slzakharov@edu.hse.ru">
                            <!--v-model="inputedEmail">-->
                            <!--@focus="emailIsInputed">-->
                            <button class="button clickable">
                            <!--@click="saveEmail">-->
                            Готово!</button>
                        </div>

                    </popover>
                </transition>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    name: 'SiteHeader',
};
</script>
<style lang="scss">
    @import '~@/assets/style/_colors.scss';
.vue-popover {
    top: 45px !important;
    width: unset !important;
    right: -25px !important;
    left: unset !important;
    background: $attention-color !important;
    padding: 15px;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.5);

    &::before {
        right: 5px !important;
        left: unset !important;
        border-bottom: 6px solid $attention-color !important;
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
            //line-height: 55px;
        }
    }

    .container {
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

            &:hover {
                background-color: $accent-color-light;
            }

            &:active {

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
            line-height: 45px;
            font-family: Raleway, sans-serif;
            font-size: 1.5em;
            font-weight: 700;
            margin-left: 25px;
            overflow: visible;
            position: relative;

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

    .container {


        .input {
            padding: 8px 15px;
            outline: none;
            border-radius: 2px;
            font-size: 0.8em;
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
            padding: 10px 15px;
            border-radius: 2px;
            border: 1px solid $text-color-light;
            background-color: transparent;
            color: $text-color-light;
            transition: background-color, .5s;
            outline: none;
            font-size: 0.7em;

            &:hover {
                background-color: $light-very-transparent-color;
            }
        }
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
