/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_UNIT_ID: 'SET_UNIT_ID',
    SET_UNIT_NAME: 'SET_UNIT_NAME',
    SET_UNIT_SYMBOL: 'SET_UNIT_SYMBOL',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_UNIT_ID](state, value) {
        state.id = value;
    },
    [types.SET_UNIT_NAME](state, value) {
        state.name = value;
    },
    [types.SET_UNIT_SYMBOL](state, value) {
        state.symbol = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();

        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
