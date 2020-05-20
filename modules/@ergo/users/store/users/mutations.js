/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject } from '@Core/models/objectWrapper';
import defaultState from './state';

export const types = {
    SET_STATE: 'SET_STATE',
    SET_LANGUAGE_PRIVILEGES: 'SET_LANGUAGE_PRIVILEGES',
    CLEAR_STATE: 'CLEAR_STATE',
};
export default {
    [types.SET_STATE](state, { key, value }) {
        state[key] = value;
    },
    [types.SET_LANGUAGE_PRIVILEGES](state, value) {
        state.languagePrivilegesCollection = isObject(value) ? { ...value } : value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
