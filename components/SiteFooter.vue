<template>
    <div class="site-footer">
        <div class="title centered-text">Поделиться</div>
        <div class="socnets-container">
            <a href="http://vk.com/share.php?url=http://kovtoroy.ru/&title=Ко второй - расписание занятий и свободные аудитории в корпусах НИУ ВШЭ&description=«Ко второй» покажет расписание занятий а также поможет найти место для того, чтобы спокойно поботать во время окна, переждать скучную лекцию или провести консультацию умного одногруппника&image=https://github.com/OneStepCloser/fintech-coorsuch/blob/master/public/images/soc-network.jpg?raw=true&noparse=true">
                <img class="icon clickable"
                     :src="require('@/assets/image/icons/vk.svg')">
            </a>
            <a href="https://telegram.me/share/url?url=http://kovtoroy.ru/&text=Ко второй - расписание занятий и свободные аудитории в корпусах НИУ ВШЭ">
                <img class="icon clickable"
                     :src="require('@/assets/image/icons/tg.svg')">
            </a>
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

    .site-footer {
        background-color: $dark-color-darker;
        color: $text-color-light;
        padding: 20px 15%;
        position: relative;

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
            margin-bottom: 10px;

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
