/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeFromObjectByKey,
} from '@Core/models/objectWrapper';

import defaultState from './state';

export const types = {
    SET_DEFAULT_LANGUAGE: 'SET_DEFAULT_LANGUAGE',
    SET_LANGUAGES_TREE: 'SET_LANGUAGES_TREE',
    SET_LANGUAGES: 'SET_LANGUAGES',
    SET_LOADER: 'SET_LOADER',
    REMOVE_LOADER: 'REMOVE_LOADER',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_LANGUAGES_TREE](state, languagesTree) {
        state.languagesTree = languagesTree;
    },
    [types.SET_LANGUAGES](state, languages) {
        state.languages = languages;
    },
    [types.SET_DEFAULT_LANGUAGE](state, code) {
        state.defaultLanguageCodeByPrivileges = code;
    },
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
    [types.CLEAR_STATE](state) {
        const states = defaultState();

        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
