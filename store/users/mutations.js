/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_STATE: 'SET_STATE',
    CLEAR_STORAGE: 'CLEAR_STORAGE',
};
export default {
    [types.SET_STATE](state, { key, value }) {
        state[key] = value;
    },
    [types.CLEAR_STORAGE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
