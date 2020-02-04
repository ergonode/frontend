/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { removeFromObjectByKey } from '@Core/models/objectWrapper';
import defaultState from './state';

export const types = {
    SET_ATTRIBUTE_ID: 'SET_ATTRIBUTE_ID',
    SET_ATTRIBUTE_CODE: 'SET_ATTRIBUTE_CODE',
    SET_ATTRIBUTE_PARAMETER: 'SET_ATTRIBUTE_PARAMETER',
    SET_ATTRIBUTE_GROUPS: 'SET_ATTRIBUTE_GROUPS',
    SET_ATTRIBUTE_GROUPS_OPTIONS: 'SET_ATTRIBUTE_GROUPS_OPTIONS',
    SET_ATTRIBUTE_TYPE: 'SET_ATTRIBUTE_TYPE',
    INITIALIZE_OPTIONS: 'INITIALIZE_OPTIONS',
    ADD_ATTRIBUTE_OPTION_KEY: 'ADD_ATTRIBUTE_OPTION_KEY',
    REMOVE_ATTRIBUTE_OPTION_KEY: 'REMOVE_ATTRIBUTE_OPTION_KEY',
    SET_ATTRIBUTE_OPTION_KEY: 'SET_ATTRIBUTE_OPTION_KEY',
    SET_OPTION_LANGUAGE_CODE_FOR_VALUE: 'SET_OPTION_LANGUAGE_CODE_FOR_VALUE',
    SET_OPTION_VALUE_FOR_LANGUAGE_CODE: 'SET_OPTION_VALUE_FOR_LANGUAGE_CODE',
    SET_OPTION_VALUE: 'SET_OPTION_VALUE',
    SET_MULTILINGUAL_ATTRIBUTE: 'SET_MULTILINGUAL_ATTRIBUTE',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_ATTRIBUTE_ID](state, id) {
        state.id = id;
    },
    [types.INITIALIZE_OPTIONS](state, options = {}) {
        state.options = options;
    },
    [types.ADD_ATTRIBUTE_OPTION_KEY](state, index) {
        state.options = {
            ...state.options,
            [index]: { key: '', value: '' },
        };
    },
    [types.REMOVE_ATTRIBUTE_OPTION_KEY](state, key) {
        state.options = removeFromObjectByKey(state.options, key);
    },
    [types.SET_ATTRIBUTE_OPTION_KEY](state, { index, key }) {
        state.options = { ...state.options, [index]: { key, value: state.options[index].value } };
    },
    [types.SET_OPTION_LANGUAGE_CODE_FOR_VALUE](state, { index, languageCode }) {
        state.options[index].value = { ...state.options[index].value, [languageCode]: '' };
    },
    [types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE](state, { index, languageCode, value }) {
        state.options[index].value[languageCode] = value;
        state.options = { ...state.options };
    },
    [types.SET_OPTION_VALUE](state, { index, value }) {
        state.options[index].value = value;
        state.options = { ...state.options };
    },
    [types.SET_MULTILINGUAL_ATTRIBUTE](state, isMultilingual) {
        state.isMultilingual = isMultilingual;
    },
    [types.SET_ATTRIBUTE_CODE](state, code) {
        state.code = code;
    },
    [types.SET_ATTRIBUTE_PARAMETER](state, parameter) {
        state.parameter = parameter;
    },
    [types.SET_ATTRIBUTE_GROUPS](state, groups) {
        state.groups = groups;
    },
    [types.SET_ATTRIBUTE_GROUPS_OPTIONS](state, groupOptions) {
        state.groupOptions = groupOptions;
    },
    [types.SET_ATTRIBUTE_TYPE](state, type) {
        state.type = type;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
