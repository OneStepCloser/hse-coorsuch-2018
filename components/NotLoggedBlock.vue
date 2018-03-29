<template>
    <div class="not-logged centered-text">
        <div class="text">Чтобы наш сервис был ещё удобнее, введите адрес корпоративной почты</div>
        <input class="input"
               placeholder="slzakharov@edu.hse.ru">
        <button class="button clickable">Готово!</button>
        <img src="/img/close.svg"
             class="close clickable">
    </div>
</template>

<script>
export default {
    name: 'NotLoggedBlock',
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .not-logged {
        background-color: $attention-color;
        padding: 20px 15%;

        .text {
            font-size: 1.3em;
            color: $text-color-light;
        }

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

            &:hover {
                background-color: $light-very-transparent-color;
            }
        }

        .close {
            width: 15px;
            height: 15px;
            position: absolute;
            top: 20px;
            right: calc(15% - 23px);
        }
    }
</style>
