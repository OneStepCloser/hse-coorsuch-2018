import Vue from '~/node_modules/vue';
import Vuex from '~/node_modules/vuex';
import {
    getRequest,
    getFreeRooms,
    getPersonalSchedule,
    getSunday,
    getMonday,
    dateForRequest,
    API_HOST,
} from '~/assets/js/utils';
import { currentDay } from '~/assets/js/static_data';

Vue.use(Vuex);

const buildingsUrl = `${API_HOST}/ruzservice.svc/buildings`;
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
        notificationToFillEmailCanBeShown: false,
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
        notificationToFillEmailCanBeShown: state => state.notificationToFillEmailCanBeShown,
    },
    actions: {
        loadBuildings({ commit, state }) {
            let answer = null;
            // console.log('lolkek');
            state.loading = true;

            return getRequest(buildingsUrl)
                .then((response) => {
                    // console.log('loooool', response);
                    answer = response.data;
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
                    // console.log(error);
                });
        },
        loadEmailFromLocalStorage({ dispatch, commit, state }) {
            // console.log('INSIDE LOAD EMAIL');

            if (process.browser && window.localStorage.kovtoroiEmail) {
                // console.log('CURRENT DATE', currentDay);
                const monday = dateForRequest(getMonday(currentDay));
                const sunday = dateForRequest(getSunday(currentDay));
                commit('emailFromLocalStorageLoaded', window.localStorage.kovtoroiEmail);
                dispatch('loadPersonalSchedule', { fromDate: monday, toDate: sunday })
                    .catch((err) => {
                        // console.log('ERR', err)
                        // console.log('ппц нет такого мейла', state.email);
                    });
            }
        },
        loadPreferedBuilding({ commit }) {
            if (process.browser && window.localStorage.kovtoroiBuilding) {
                commit('preferedBuildingLoaded', window.localStorage.kovtoroiBuilding);
            }
        },
        loadPersonalSchedule({ commit, state }, { fromDate, toDate }) {
            // console.log('LOAD PERSONAL SCHEDULE', fromDate, toDate, state.email);
            state.loading = true;
            // console.log('LOADING 1', state.loading);
            return getPersonalSchedule(fromDate, toDate, state.email)
                .then((response) => {
                    // console.log('RESPONSE', response);

                    if (!response.data) {
                        commit('personalScheduleLoaded', {});
                    } else {
                        commit('personalScheduleLoaded', _.groupBy(response.data, lesson => lesson.date));
                    }
                    // console.log(response.data);
                })
                .catch((err) => {
                    commit('personalScheduleLoaded', {});
                    return Promise.reject(err);
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
            // console.log('EMAIL LOADED');
        },
        personalScheduleLoaded(state, schedule) {
            state.personalSchedule = schedule;
            state.loading = false;
        },
        preferedBuildingLoaded(state, buildingId) {
            state.preferedBuilding = buildingId;
        },
        setNotificationToFillEmailCanBeShown(state, newVal) {
            state.notificationToFillEmailCanBeShown = !!newVal;
        },
    },
});

export default store;
