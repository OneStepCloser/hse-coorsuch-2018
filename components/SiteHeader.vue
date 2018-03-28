<template>
    <div class="site-header">
        <h1 class="name">Курсач</h1>
        <div class="container">
            <nuxt-link class="link"
                       to="/"
                       active-class="link_active"
                       exact>Расписание</nuxt-link>
            <nuxt-link class="link"
                       to="/freerooms"
                       active-class="link_active"
                       exact>Свободные аудитории</nuxt-link>
            <div class="avatar clickable">ЗС
                <img class="arrow-down clickable"
                     src="/img/arrow-down.svg">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SiteHeader',
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

.site-header {
    background-color: $accent-color;
    height: 60px;
    padding: 0 15%;
    position: relative;

    .name {
        font-family: Raleway, sans-serif;
        color: $dark-color;
        margin: 0;
        font-size: 35px;
        font-weight: 900;
        line-height: 55px;
        float: left;
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
</style>
