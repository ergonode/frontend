/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';
import { removeFromObjectByKey } from '~/model/objectWrapper';

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
