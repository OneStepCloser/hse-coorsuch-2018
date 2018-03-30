import Vue from '~/node_modules/vue';
import Vuex from '~/node_modules/vuex';
import { getRequest } from '~/utils';

Vue.use(Vuex);

const buildingsUrl = 'http://ruz.hse.ru/ruzservice.svc/buildings';

const store = () => new Vuex.Store({

    state: {
        buildings: [],
    },
    getters: {
        getBuildings: state => state.buildings,
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
    },
    mutations: {
        buildingsLoaded(state, buildings) {
            state.buildings = buildings;
        },
    },
});

export default store;
