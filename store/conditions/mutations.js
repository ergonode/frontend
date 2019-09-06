/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_CONDITIONS: 'SET_CONDITIONS',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_CONDITIONS](state, { key, value }) {
        state.conditions = { ...state.conditions, [key]: value };
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
