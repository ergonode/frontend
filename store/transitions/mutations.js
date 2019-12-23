/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_SOURCE: 'SET_SOURCE',
    SET_DESTINATION: 'SET_DESTINATION',
    SET_CONDITION_SET_ID: 'SET_CONDITION_SET_ID',
    SET_ROLES: 'SET_ROLES',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_SOURCE](state, value) {
        state.source = value;
    },
    [types.SET_DESTINATION](state, value) {
        state.destination = value;
    },
    [types.SET_ROLES](state, value) {
        state.roles = value;
    },
    [types.SET_CONDITION_SET_ID](state, value) {
        state.conditionSetId = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
