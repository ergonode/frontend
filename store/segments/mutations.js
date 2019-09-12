/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_SEGMENT_ID: 'SET_SEGMENT_ID',
    SET_SEGMENT_CODE: 'SET_SEGMENT_CODE',
    SET_CONDITION_SET_ID: 'SET_CONDITION_SET_ID',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_SEGMENT_ID](state, value) {
        state.id = value;
    },
    [types.SET_SEGMENT_CODE](state, value) {
        state.code = value;
    },
    [types.SET_CONDITION_SET_ID](state, value) {
        state.conditionSetId = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
