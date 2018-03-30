const axios = require('axios');

const yqlUrl = 'https://query.yahooapis.com/v1/public/yql';

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
        Object.keys(params).map(key => paramsString += `${key}=${params[key]}&`);
    }

    return axios.get(yqlUrl, {
        params: {
            q: `SELECT * FROM json WHERE url="${url}?${paramsString}"`,
            format: 'json',
            jsonCompat: 'new',
        },
    }, { responseType: 'jsonp' });
}

function isIntersected(lessonFromTable, lessonAtAuditorium) {
    return lessonFromTable.begin < lessonAtAuditorium.endLesson
        && lessonFromTable.end > lessonAtAuditorium.beginLesson;
}

function getFreeRooms(date, buildingId, pairNumber) {
    const neededLessonAtTable = lessonsOrder[pairNumber - 1];
    return getRequest('http://ruz.hse.ru/ruzservice.svc/auditoriums', { buildingOid: buildingId })
        .then((response) => {
            let auditoriums = response.data.query.results.json.json;
            auditoriums = auditoriums.filter(auditorium =>
                (auditorium.typeOfAuditorium !== 'Кабинет преподавателя'));

            const arrayOfRequests = auditoriums.map(aud =>
                getRequest('http://ruz.hse.ru/ruzservice.svc/lessons', {
                    fromdate: date,
                    todate: date,
                    auditoriumoid: aud.auditoriumOid,
                }).then((response) => {
                    if (!response.data.query.results) {
                        return { number: aud.number, type: aud.typeOfAuditorium };
                    }

                    const lessons = response.data.query.results.json.json || response.data.query.results.json;
                    if (lessons.some(lesson => isIntersected(neededLessonAtTable, lesson))) { return null; }
                    return { number: aud.number, type: aud.typeOfAuditorium };
                }));

            return Promise.all(arrayOfRequests);
        }).then((arrayOfAudNumbers) => {
            arrayOfAudNumbers = arrayOfAudNumbers.filter(el => el !== null);
            return arrayOfAudNumbers;
        })
        .catch((error) => {
            console.log(error);
        });
}

function addLeadingZeros(number, size) {
    const res = `${'0'.repeat(size)}${number}`;
    return res.substr(res.length - size);
}

function checkEmail(email) {
    return /@edu\.hse\.ru$/.test(email);
}

export { getRequest, getFreeRooms, addLeadingZeros, checkEmail };
