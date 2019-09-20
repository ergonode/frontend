/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_TREE_ID: 'SET_TREE_ID',
    SET_CODE: 'SET_CODE',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_TREE_ID](state, value) {
        state.treeId = value;
    },
    [types.SET_CODE](state, value) {
        state.code = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
