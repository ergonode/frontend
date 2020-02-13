/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_ID: 'SET_ID',
    SET_CODE: 'SET_CODE',
    SET_TYPE: 'SET_TYPE',
    SET_COLLECTION_TYPES_OPTIONS: 'SET_COLLECTION_TYPES_OPTIONS',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_ID](state, id) {
        state.id = id;
    },
    [types.SET_CODE](state, code) {
        state.code = code;
    },
    [types.SET_TYPE](state, type) {
        state.type = type;
    },
    [types.SET_COLLECTION_TYPES_OPTIONS](state, options) {
        state.types = options;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
