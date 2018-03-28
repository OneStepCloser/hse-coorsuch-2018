<template>
    <div class="current-pairs">
        <div class="label">сейчас у вас:</div>
        <span class="info info_important">Семинар, Проектирование архитектуры программных систем </span>
        <span class="info">в ауд </span>
        <span class="info info_important">317.</span>
        <div class="label">следующая пара:</div>
        <span class="info info_important">Семинар, Разработка и анализ требований </span>
        <span class="info">в ауд </span>
        <span class="info info_important">501.</span>

    </div>
</template>

<script>
export default {
    name: 'CurrentPairs',
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .current-pairs {
        background-color: $dark-color;
        padding: 30px 15%;

        .label {
            color: $light-transparent-color;

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
    }
</style>
