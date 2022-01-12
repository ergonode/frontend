/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeObjectProperty,
} from '@Core/models/objectWrapper';

export const types = {
    SET_OPTION_STATE: 'SET_OPTION_STATE',
    INITIALIZE_OPTIONS: 'INITIALIZE_OPTIONS',
    ADD_ATTRIBUTE_OPTION_KEY: 'ADD_ATTRIBUTE_OPTION_KEY',
    REMOVE_ATTRIBUTE_OPTION_KEY: 'REMOVE_ATTRIBUTE_OPTION_KEY',
    REMOVE_OPTIONS_STATE: 'REMOVE_OPTIONS_STATE',
    SET_ATTRIBUTE_OPTION_KEY: 'SET_ATTRIBUTE_OPTION_KEY',
    SET_OPTION_LANGUAGE_CODE_FOR_VALUE: 'SET_OPTION_LANGUAGE_CODE_FOR_VALUE',
    SET_OPTION_VALUE_FOR_LANGUAGE_CODE: 'SET_OPTION_VALUE_FOR_LANGUAGE_CODE',
    SET_OPTION_VALUE: 'SET_OPTION_VALUE',
};

export default {
    [types.SET_OPTION_STATE](state, {
        key, type, value = null,
    }) {
        if (state.optionsState[key]) {
            state.optionsState[key] = {
                ...state.optionsState[key],
                [type]: value,
            };
        } else {
            state.optionsState = {
                ...state.optionsState,
                [key]: {
                    [type]: value,
                },
            };
        }
    },
    [types.REMOVE_OPTIONS_STATE](state) {
        state.optionsState = {};
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
        state.options = removeObjectProperty(state.options, key);
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
            state.options[index].value = removeObjectProperty(
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
        index, value = null,
    }) {
        state.options = {
            [index]: {
                ...state.options[index],
                value,
            },
            ...state.options,
        };
    },
};
