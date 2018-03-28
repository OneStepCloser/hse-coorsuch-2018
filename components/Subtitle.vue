<template>
    <div class="container"
         :class="{ light: isLight }">
        <div class="semiline"/>
        <div class="title centered-text">{{ text }}</div>
        <div class="semiline"/>
    </div>
</template>
<script>
export default {
    name: 'Subtitle',
    props: {
        text: {
            type: String,
            default: '',
        },
        isLight: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style lang="scss" scoped>
    @import '~@/assets/style/main.scss';
    @import '~@/assets/style/_colors.scss';

    .container {
        display: flex;
        align-items: center;
        padding-top: 40px;
    }

    .light {
        .title {
            color: $text-color-light;
        }

        .semiline {
            background-color: $text-color-light;
        }
    }

    .semiline {
        height: 3px;
        background-color: $text-color-dark;
        //flex-basis: 100%;
        flex-shrink: 1;
        flex-grow: 1;
    }

    .title {
        font-weight: 500;
        margin: 0 40px;
        text-transform: uppercase;
        white-space: nowrap;
        font-size: 30px;

        @media screen and (max-width: 685px) {
            font-size: 25px;
            margin: 0 30px;
        }

        @media screen and (max-width: 870px) {
            white-space: normal;
            width: 70%;
            flex-shrink: 0;
            margin: 0 20px;
        }

        @media screen and (max-width: 400px) {
            font-size: 20px;
        }
    }
</style>

