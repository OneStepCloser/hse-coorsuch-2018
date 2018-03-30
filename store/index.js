import Vue from '~/node_modules/vue';
import Vuex from '~/node_modules/vuex';
import { getRequest, getFreeRooms } from '~/utils';

Vue.use(Vuex);

const buildingsUrl = 'http://ruz.hse.ru/ruzservice.svc/buildings';

const store = () => new Vuex.Store({

    state: {
        buildings: [],
        neededBuilding: -1,
        neededDate: -1,
        neededPair: -1,
        freeRooms: [],
    },
    getters: {
        getBuildings: state => state.buildings,
        neededBuilding: state => state.neededBuilding,
        neededDate: state => state.neededDate,
        neededPair: state => state.neededPair,
        freeRooms: state => state.freeRooms,
    },
    actions: {
        loadBuildings({ commit }) {
            let answer = null;
            console.log('lolkek');

            return getRequest(buildingsUrl)
                .then((response) => {
                    console.log('lol');
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
                    commit('buildingsLoaded', answer);
                });
        },
        loadFreeRooms({ commit }, { date, buildingId, lessonNumber }) {

            return getFreeRooms(date, buildingId, lessonNumber)
                .then((response) => {
                    commit('freeRoomsLoaded', response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mutations: {
        buildingsLoaded(state, buildings) {
            state.buildings = buildings;
        },
        freeRoomsLoaded(state, freeRooms) {
            state.freeRooms = freeRooms;
        },
    },
});

export default store;
