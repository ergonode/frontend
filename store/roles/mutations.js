/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_ROLE_ID: 'SET_ROLE_ID',
    SET_ROLE_NAME: 'SET_ROLE_NAME',
    SET_ROLE_DESCRIPTION: 'SET_ROLE_DESCRIPTION',
    SET_ROLE_PRIVILEGES: 'SET_ROLE_PRIVILEGES',
    CLEAR_STORAGE: 'CLEAR_STORAGE',
};

export default {
    [types.SET_ROLE_ID](state, value) {
        state.id = value;
    },
    [types.SET_ROLE_NAME](state, value) {
        state.name = value;
    },
    [types.SET_ROLE_DESCRIPTION](state, value) {
        state.description = value;
    },
    [types.SET_ROLE_PRIVILEGES](state, value) {
        state.privileges = value;
    },
    [types.CLEAR_STORAGE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
