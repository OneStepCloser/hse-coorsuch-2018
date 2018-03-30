<template>
    <table class="free-rooms-table centered">
        <thead>
            <tr>
                <th>Номер аудитории</th>
                <th>Тип аудитории</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="room in rooms">
                <td>{{ room.number }}</td>
                <td>{{ room.type }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'FreeRoomsTable',
    props: {
        rooms: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/_colors.scss';

    .free-rooms-table {
        min-width: 60%;
        margin-top: 20px;
        border-spacing: 0;
        table-layout: fixed;

        td {
            text-align: center;
            padding: 5px;
        }

        th {
            background-color: $dark-color;
            color: $text-color-light;
            padding: 10px;
            font-size: 1.2em;
            font-family: Raleway, sans-serif;
        }


        tr:nth-child(even) {
            background-color: $accent-color-lightest-extra;
        }

        tr:nth-child(odd) {
            background-color: $accent-color-lightest;
        }
    }

</style>
