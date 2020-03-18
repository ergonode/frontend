/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { removeFromObjectByKey } from '@Core/models/objectWrapper';
import defaultState from './state';

export const types = {
    SET_LOADER: 'SET_LOADER',
    REMOVE_LOADER: 'REMOVE_LOADER',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_LOADER](state, key) {
        state.loaders = { [key]: true };
    },
    [types.REMOVE_LOADER](state, key) {
        state.loaders = removeFromObjectByKey(state.loaders, key);
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
