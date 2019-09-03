/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_CODE: 'SET_CODE',
    SET_COLOR: 'SET_COLOR',
    SET_STATUS_ID: 'SET_STATUS_ID',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_STATUS_ID](state, id) {
        state.id = id;
    },
    [types.SET_CODE](state, code) {
        state.code = code;
    },
    [types.SET_COLOR](state, color) {
        state.color = color;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
