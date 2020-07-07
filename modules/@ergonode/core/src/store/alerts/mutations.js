/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    ADD_ALERT: 'ADD_ALERT',
    REMOVE_ALERT: 'REMOVE_ALERT',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.ADD_ALERT](state, payload) {
        state.alerts.push(payload);
    },
    [types.REMOVE_ALERT](state, index) {
        state.alerts.splice(index, 1);
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
