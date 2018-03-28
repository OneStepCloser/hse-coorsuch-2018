<template>
    <div class="freerooms">
        <el-select v-model="buildingId"
                   placeholder="Введите или выберите адрес корпуса"
                   class="select"/>
        <button class="go-button">Стартуем! lol kek</button>
    </div>
</template>

<script>
import { getRequest } from '@/utils';

const buildingsUrl = 'http://ruz.hse.ru/ruzservice.svc/buildings';

export default {
    name: 'Freerooms',
    data() {
        return {
            buildingId: -1,
            pairNumber: -1,
            resultingFreeRooms: [],
            resultIsLoaded: true,
        };
    },
    methods: {
        getFilteredFreeRooms() {

        },

    },
    created() {
        this.resultIsLoaded = false;
        let answer = null;

        getRequest(buildingsUrl)
            .then((response) => {
                answer = response.data.query.results.json.json;
            })
            .then(() => {
                answer = answer.filter(item => !(
                    item.address === '' ||
                    !item.address ||
                    item.address.includes('Пермь') ||
                    item.address.includes('Санкт-Петербург') ||
                    item.address.includes('Нижний Новгород') ||
                    item.address === 'Москва'
                    // this.getAuditoriums(item['buildingOid']) < 7
                ));
            })
            .then(() => {
                this.resultingFreeRooms = answer;
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>

<style lang="scss" scoped>

    .freerooms {

        .select {
            width: 100%;
        }

        .go-button {

        }
    }

</style>
