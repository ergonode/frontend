/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_ID: 'SET_ID',
    SET_CODE: 'SET_CODE',
    SET_NAME: 'SET_NAME',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_ID](state, id) {
        state.id = id;
    },
    [types.SET_CODE](state, code) {
        state.code = code;
    },
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
