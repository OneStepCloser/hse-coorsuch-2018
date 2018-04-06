import Vue from '~/node_modules/vue';
import Vuex from '~/node_modules/vuex';
import { getRequest, getFreeRooms, getPersonalSchedule, getSunday, getMonday, dateForRequest } from '~/assets/js/utils';
import _ from '~/node_modules/lodash';
import { currentDay } from '~/assets/js/static_data';

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
        personalSchedule: -1,
        loading: false,
        preferedBuilding: -1,
    },
    getters: {
        getBuildings: state => state.buildings,
        neededBuilding: state => state.neededBuilding,
        neededDate: state => state.neededDate,
        neededPair: state => state.neededPair,
        freeRooms: state => state.freeRooms,
        email: state => state.email,
        emailExists: state => state.email !== -1,
        personalSchedule: state => state.personalSchedule,
        loading: state => state.loading,
        preferedBuilding: state => state.preferedBuilding,
    },
    actions: {
        loadBuildings({ commit, state }) {
            let answer = null;
            // console.log('lolkek');
            state.loading = true;

            return getRequest(buildingsUrl)
                .then((response) => {
                    // console.log('loooool', response);
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
                    state.loading = false;
                });
        },
        loadFreeRooms({ commit }, { date, buildingId, lessonNumber }) {
            return getFreeRooms(date, buildingId, lessonNumber)
                .then((response) => {
                    // console.log('FREE ROOMS RESPONSE', response);
                    commit('freeRoomsLoaded', response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        loadEmailFromLocalStorage({ dispatch, commit, state }) {
            // console.log('INSIDE LOAD EMAIL');

            if (process.browser && window.localStorage.kovtoroiEmail) {
                const monday = dateForRequest(getMonday(new Date(currentDay)));
                const sunday = dateForRequest(getSunday(new Date(currentDay)));
                commit('emailFromLocalStorageLoaded', window.localStorage.kovtoroiEmail);
                dispatch('loadPersonalSchedule', { fromDate: monday, toDate: sunday })
                    .catch(() => {
                        console.log('ппц нет такого мейла', state.email);
                    });
            }
        },
        loadPreferedBuilding({ commit }) {
            if (process.browser && window.localStorage.kovtoroiBuilding) {
                commit('preferedBuildingLoaded', window.localStorage.kovtoroiBuilding);
            }
        },
        loadPersonalSchedule({ commit, state }, { fromDate, toDate }) {
            console.log('LOAD PERSONAL SCHEDULE', fromDate, toDate, state.email);
            state.loading = true;
            // console.log('LOADING 1', state.loading);
            return getPersonalSchedule(fromDate, toDate, state.email)
                .then((response) => {


                    if (response.data.query.results === null) {
                        commit('personalScheduleLoaded', {});
                    } else {
                        commit('personalScheduleLoaded', _.groupBy(response.data.query.results.json.json, lesson => lesson.date));
                    }
                    console.log(response.data.query.results.json.json);
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
            console.log('EMAIL LOADED');
        },
        personalScheduleLoaded(state, schedule) {
            state.personalSchedule = schedule;
            state.loading = false;
            // console.log('LOADING 2', state.loading);
        },
        preferedBuildingLoaded(state, buildingId) {
            state.preferedBuilding = buildingId;
        },
    },
});

export default store;
