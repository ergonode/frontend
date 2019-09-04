/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_SEGMENT_ID: 'SET_SEGMENT_ID',
    SET_SEGMENT_CODE: 'SET_SEGMENT_CODE',
    SET_SEGMENT_NAME: 'SET_SEGMENT_NAME',
    SET_SEGMENT_DESCRIPTION: 'SET_SEGMENT_DESCRIPTION',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_SEGMENT_ID](state, value) {
        state.id = value;
    },
    [types.SET_SEGMENT_CODE](state, value) {
        state.code = value;
    },
    [types.SET_SEGMENT_NAME](state, value) {
        state.name = value;
    },
    [types.SET_SEGMENT_DESCRIPTION](state, value) {
        state.description = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
