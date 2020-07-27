/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeFromObjectByKey,
} from '@Core/models/objectWrapper';

export const types = {
    SET_LOADER: 'SET_LOADER',
    REMOVE_LOADER: 'REMOVE_LOADER',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

export default {
    [types.OPEN_MODAL](state, {
        key, ...params
    }) {
        state.modals = {
            [key]: params,
        };
    },
    [types.CLOSE_MODAL](state, key) {
        state.modals = removeFromObjectByKey(state.modals, key);
    },
    [types.SET_LOADER](state, key) {
        state.loaders = {
            [key]: true,
        };
    },
    [types.REMOVE_LOADER](state, key) {
        state.loaders = removeFromObjectByKey(state.loaders, key);
    },
};
