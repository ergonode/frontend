/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_ID: 'SET_ID',
    SET_NAME: 'SET_NAME',
    SET_TYPE: 'SET_TYPE',
    SET_CONFIGURATION: 'SET_CONFIGURATION',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_ID](state, id) {
        state.id = id;
    },
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    [types.SET_TYPE](state, type) {
        state.type = type;
    },
    [types.SET_CONFIGURATION](state, configuration) {
        state.configuration = configuration;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
