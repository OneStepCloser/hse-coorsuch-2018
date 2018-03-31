import Vue from '~/node_modules/vue';
import Vuex from '~/node_modules/vuex';
import { getRequest, getFreeRooms, getPersonalSchedule } from '~/utils';
import _ from '~/node_modules/lodash';

Vue.use(Vuex);

const buildingsUrl = 'http://ruz.hse.ru/ruzservice.svc/buildings';
// const personalLessonsUrl = 'http://ruz.hse.ru/ruzservice.svc/personlessons';

const store = () => new Vuex.Store({

    state: {
        buildings: [],
        neededBuilding: -1,
        neededDate: -1,
        neededPair: -1,
        freeRooms: -1,
        email: -1,
        personalSchedule: [],
    },
    getters: {
        getBuildings: state => state.buildings,
        neededBuilding: state => state.neededBuilding,
        neededDate: state => state.neededDate,
        neededPair: state => state.neededPair,
        freeRooms: state => state.freeRooms,
        email: state => state.email,
        personalSchedule: state => state.personalSchedule,
    },
    actions: {
        loadBuildings({ commit }) {
            let answer = null;
            console.log('lolkek');

            return getRequest(buildingsUrl)
                .then((response) => {
                    console.log('loooool', response);
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
                    console.log('FREE ROOMS RESPONSE', response);
                    commit('freeRoomsLoaded', response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        loadEmailFromLocalStorage({ commit }) {
            console.log('INSIDE LOAD EMAIL');
            if (process.browser && window.localStorage.kovtoroiEmail) {
                console.log('LOADING EMAIL');
                commit('emailFromLocalStorageLoaded', window.localStorage.kovtoroiEmail);
            }
        },
        loadPersonalSchedule({ commit, state }, { fromDate, toDate }) {
            console.log('LOAD PERSONAL SCHEDULE', fromDate, toDate, state.email);
            return getPersonalSchedule(fromDate, toDate, state.email)
                .then((response) => {
                    commit('personalScheduleLoaded', _.groupBy(response.data.query.results.json.json, lesson => lesson.date));
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
        emailFromLocalStorageLoaded(state, email) {
            state.email = email;
        },
        personalScheduleLoaded(state, schedule) {
            state.personalSchedule = schedule;
        },
    },
});

export default store;
