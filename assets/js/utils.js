import axios from 'axios';

const API_HOST = 'http://ruz2018.hse.ru';

const yqlUrl = 'https://query.yahooapis.com/v1/public/yql';

const personalLessonsUrl = `${API_HOST}/ruzservice.svc/personlessons`;

const lessonsOrder = [
    { begin: '09:00', end: '10:20' },
    { begin: '10:30', end: '11:50' },
    { begin: '12:10', end: '13:30' },
    { begin: '13:40', end: '15:00' },
    { begin: '15:10', end: '16:30' },
    { begin: '16:40', end: '18:00' },
    { begin: '18:10', end: '19:30' },
    { begin: '19:40', end: '21:00' },
];

function getRequest(url, params) {
    let paramsString = '';

    if (params) {
        _.forEach(Object.keys(params), (key) => {
            paramsString += `${key}=${params[key]}&`;
        });
        // Object.keys(params).map(key => paramsString += `${key}=${params[key]}&`);
    }

    const queryString = `https://cors-anywhere.herokuapp.com/${url}?${paramsString}`

    return axios.get(queryString)
        // .then((resp) => {
        //     console.log('GET', resp);
        // });
}

function isIntersected(lessonFromTable, lessonAtAuditorium) {
    return lessonFromTable.begin < lessonAtAuditorium.endLesson
        && lessonFromTable.end > lessonAtAuditorium.beginLesson;
}

function getFreeRooms(date, buildingId, pairNumber) {
    const neededLessonAtTable = lessonsOrder[pairNumber - 1];
    return getRequest(`${API_HOST}/ruzservice.svc/auditoriums`, { buildingOid: buildingId })
        .then((response) => {
            let auditoriums = (response.data) || [];
            if (!auditoriums) {
                return auditoriums;
            }
            auditoriums = auditoriums.filter(auditorium =>
                (auditorium.typeOfAuditorium !== 'Кабинет преподавателя'));

            const arrayOfRequests = auditoriums.map(aud =>
                getRequest(`${API_HOST}/ruzservice.svc/lessons`, {
                    fromdate: date,
                    todate: date,
                    auditoriumoid: aud.auditoriumOid,
                }).then((response) => {
                    if (!response.data) {
                        return { number: aud.number, type: aud.typeOfAuditorium };
                    }

                    const lessons = response.data;
                    if (lessons.some(lesson => isIntersected(neededLessonAtTable, lesson))) {
                        return null;
                    }
                    return { number: aud.number, type: aud.typeOfAuditorium };
                }));

            return Promise.all(arrayOfRequests);
        }).then((arrayOfAudNumbers) => {
            // console.log('NEW', arrayOfAudNumbers);
            if (!arrayOfAudNumbers) {
                return arrayOfAudNumbers;
            }
            arrayOfAudNumbers = arrayOfAudNumbers.filter(el => el !== null);
            return arrayOfAudNumbers;
        })
        .catch((error) => {
            // console.log(error);
        });
}

function getPersonalSchedule(fromDate, toDate, email) {
    return getRequest(personalLessonsUrl, { fromdate: fromDate, todate: toDate, email });
    // .then((response) => {
    //     console.log('PERSON LESSONS', response);
    // });
}

function addLeadingZeros(number, size) {
    const res = `${'0'.repeat(size)}${number}`;
    return res.substr(res.length - size);
}

function checkEmail(email) {
    return /@edu\.hse\.ru$/.test(email);
}

function dateForRequest(initialDate) {
    const year = initialDate.getFullYear();
    const month = addLeadingZeros(initialDate.getMonth() + 1, 2);
    const date = addLeadingZeros(initialDate.getDate(), 2);
    return `${year}.${month}.${date}`;
}

function getMonday(today) {
    const res = _.cloneDeep(today);
    const day = res.getDay() || 7; // Get current day number, converting Sun. to 7
    if (day !== 1) {
        res.setHours(-24 * (day - 1));
    }
    return res;
}

function getSunday(today) {
    const res = _.cloneDeep(today);
    const day = res.getDay() || 7; // Get current day number, converting Sun. to 7
    if (day !== 7) {
        res.setHours(24 * (7 - day));
    }
    return res;
}

function getWeek(monday) {
    const week = [];
    for (let i = 0; i < 7; ++i) {
        const clone = _.cloneDeep(monday);
        clone.setHours(24 * i);
        week.push(clone);
    }
    // console.log('WEEK', week);
    return week;
}

export {
    getRequest,
    getFreeRooms,
    addLeadingZeros,
    checkEmail,
    getPersonalSchedule,
    dateForRequest,
    getMonday,
    getSunday,
    getWeek,
    API_HOST,
};
