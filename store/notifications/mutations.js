/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_REQUEST_TIME_INTERVAL: 'SET_REQUEST_TIME_INTERVAL',
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    SET_REQUEST_TIMEOUT: 'SET_REQUEST_TIMEOUT',
    SET_NOTIFICATIONS_COUNT: 'SET_NOTIFICATIONS_COUNT',
    SET_NOTIFICATIONS_LIMIT: 'SET_NOTIFICATIONS_LIMIT',
    CLEAR_STATE: 'CLEAR_STATE',
};

export const mutations = {
    [types.SET_NOTIFICATIONS](state, notifications) {
        state.notifications = notifications;
    },
    [types.SET_REQUEST_TIME_INTERVAL](state, interval) {
        state.requestTimeInterval = interval;
    },
    [types.SET_REQUEST_TIMEOUT](state, timeout = null) {
        state.requestTimeout = timeout;
    },
    [types.SET_NOTIFICATIONS_COUNT](state, count) {
        state.count = count;
    },
    [types.SET_NOTIFICATIONS_LIMIT](state, limit) {
        state.limit = limit;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};

export default mutations;
