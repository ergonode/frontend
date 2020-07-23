/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeFromObjectByKey,
} from '@Core/models/objectWrapper';

export const types = {
    SET_UPDATED_OPTION: 'SET_UPDATED_OPTION',
    INITIALIZE_OPTIONS: 'INITIALIZE_OPTIONS',
    ADD_ATTRIBUTE_OPTION_KEY: 'ADD_ATTRIBUTE_OPTION_KEY',
    REMOVE_ATTRIBUTE_OPTION_KEY: 'REMOVE_ATTRIBUTE_OPTION_KEY',
    REMOVE_UPDATED_OPTION: 'REMOVE_UPDATED_OPTION',
    SET_ATTRIBUTE_OPTION_KEY: 'SET_ATTRIBUTE_OPTION_KEY',
    SET_OPTION_LANGUAGE_CODE_FOR_VALUE: 'SET_OPTION_LANGUAGE_CODE_FOR_VALUE',
    SET_OPTION_VALUE_FOR_LANGUAGE_CODE: 'SET_OPTION_VALUE_FOR_LANGUAGE_CODE',
    SET_OPTION_VALUE: 'SET_OPTION_VALUE',
};

export default {
    [types.SET_UPDATED_OPTION](state, id) {
        state.updatedOptions[id] = true;
    },
    [types.REMOVE_UPDATED_OPTION](state) {
        state.updatedOptions = {};
    },
    [types.INITIALIZE_OPTIONS](state, options = {}) {
        state.options = options;
    },
    [types.ADD_ATTRIBUTE_OPTION_KEY](state, index) {
        state.options = {
            ...state.options,
            [index]: {
                id: null,
                key: null,
                value: null,
            },
        };
    },
    [types.REMOVE_ATTRIBUTE_OPTION_KEY](state, key) {
        state.options = removeFromObjectByKey(state.options, key);
    },
    [types.SET_ATTRIBUTE_OPTION_KEY](state, {
        id, index, key,
    }) {
        state.options = {
            ...state.options,
            [index]: {
                key: key || null,
                id,
                value: state.options[index].value,
            },
        };
    },
    [types.SET_OPTION_LANGUAGE_CODE_FOR_VALUE](state, {
        index, languageCode,
    }) {
        state.options[index].value = {
            ...state.options[index].value,
            [languageCode]: '',
        };
    },
    [types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE](state, {
        index, languageCode, value,
    }) {
        if (!value) {
            state.options[index].value = removeFromObjectByKey(
                state.options[index].value,
                languageCode,
            );
        } else {
            state.options[index].value[languageCode] = value;
        }
        state.options = {
            ...state.options,
        };
    },
    [types.SET_OPTION_VALUE](state, {
        index, value,
    }) {
        state.options[index].value = value || null;
        state.options = {
            ...state.options,
        };
    },
};
