const localStorageKey = 'koVtoroy_test_emailFillNotification';

const showValue = 'show';
const notShowValue = 'hide';

function kek(store) {
    let testParamValue;
    try {
        const savedTestParamValue = localStorage.getItem(localStorageKey);
        if (![showValue, notShowValue].includes(savedTestParamValue)) {
            testParamValue = Math.random() >= 0.5 ? showValue : notShowValue;
            localStorage.setItem(localStorageKey, testParamValue);
        } else {
            testParamValue = savedTestParamValue;
        }
    } catch (e) {
        testParamValue = showValue;
    }

    store.commit('setNotificationToFillEmailCanBeShown', testParamValue === showValue);
    return testParamValue;
}

function sendReachGoal(vueInstance) {
    vueInstance.$metrika.reachGoal('emailEnteredSuccesfully');
}


export {
    sendReachGoal,
    kek as genABTestParam,
    localStorageKey as abTestParamKey,
};
