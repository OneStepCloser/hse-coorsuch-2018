<template>
    <div class="footer">
        <div class="title centered-text">Поделиться</div>
        <div class="socnets-container">
            <img class="icon clickable"
                 src="/img/vk.svg">
            <img class="icon clickable"
                 src="/img/tg.svg">
        </div>
        <a href="https://vk.com/one_step_cl0ser"
           class="author clickable">OneStepCloser</a>
    </div>
</template>

<script>
export default {
    name: 'SiteFooter',
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';
    .footer {
        background-color: $dark-color-darker;
        color: $text-color-light;
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 20px 15%;

        .title {
            font-family: Raleway, sans-serif;
            font-weight: 700;
            font-size: 1.5em;
            margin-bottom: 15px;
        }

        .socnets-container {
            display: flex;
            justify-content: center;
            margin-left: -20px;

            .icon {
                width: 40px;
                height: 40px;
                margin-left: 20px;
                border-radius: 50%;
                transition: background-color, .5s;

                &:hover {
                    background-color: $light-very-transparent-color;
                }
            }
        }

        .author {
            position: absolute;
            right: 15%;
            bottom: 5px;
            text-decoration: underline;
            color: $light-transparent-color;
            transition: color, .5s;

            &:hover {
                color: $text-color-light;
            }
        }
    }
</style>
