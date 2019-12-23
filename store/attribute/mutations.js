/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_ATTRIBUTE_ID: 'SET_ATTRIBUTE_ID',
    INITIALIZE_OPTION_KEYS: 'INITIALIZE_OPTION_KEYS',
    ADD_ATTRIBUTE_OPTION_KEY: 'ADD_ATTRIBUTE_OPTION_KEY',
    REMOVE_ATTRIBUTE_OPTION_KEY: 'REMOVE_ATTRIBUTE_OPTION_KEY',
    REMOVE_ATTRIBUTE_OPTION_VALUE: 'REMOVE_ATTRIBUTE_OPTION_VALUE',
    SET_ATTRIBUTE_OPTION_KEY: 'SET_ATTRIBUTE_OPTION_KEY',
    SET_MULTILINGUAL_ATTRIBUTE: 'SET_MULTILINGUAL_ATTRIBUTE',
    INITIALIZE_OPTION_VALUE_FOR_LANGUAGE_CODE: 'INITIALIZE_OPTION_VALUE_FOR_LANGUAGE_CODE',
    INITIALIZE_OPTION_VALUES: 'INITIALIZE_OPTION_VALUES',
    SET_OPTION_VALUE_FOR_LANGUAGE_CODE: 'SET_OPTION_VALUE_FOR_LANGUAGE_CODE',
    SET_OPTION_VALUE: 'SET_OPTION_VALUE',
    SET_ATTRIBUTE_CODE: 'SET_ATTRIBUTE_CODE',
    SET_ATTRIBUTE_PARAMETER: 'SET_ATTRIBUTE_PARAMETER',
    SET_ATTRIBUTE_GROUPS: 'SET_ATTRIBUTE_GROUPS',
    SET_ATTRIBUTE_GROUPS_OPTIONS: 'SET_ATTRIBUTE_GROUPS_OPTIONS',
    SET_ATTRIBUTE_TYPE: 'SET_ATTRIBUTE_TYPE',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_ATTRIBUTE_ID](state, id) {
        state.id = id;
    },
    [types.INITIALIZE_OPTION_KEYS](state, optionKeys) {
        state.optionKeys = optionKeys;
    },
    [types.ADD_ATTRIBUTE_OPTION_KEY](state, key) {
        state.optionKeys.push(key);
    },
    [types.REMOVE_ATTRIBUTE_OPTION_KEY](state, index) {
        state.optionKeys.splice(index, 1);
    },
    [types.REMOVE_ATTRIBUTE_OPTION_VALUE](state, { languageCode, index }) {
        state.optionValues[languageCode].splice(index, 1);
    },
    [types.SET_MULTILINGUAL_ATTRIBUTE](state, isMultilingual) {
        state.isMultilingual = isMultilingual;
    },
    [types.SET_ATTRIBUTE_OPTION_KEY](state, { index, key }) {
        state.optionKeys[index] = key;
        state.optionKeys = [...state.optionKeys];
    },
    [types.INITIALIZE_OPTION_VALUE_FOR_LANGUAGE_CODE](state, languageCode) {
        state.optionValues[languageCode] = [];
    },
    [types.INITIALIZE_OPTION_VALUES](state, optionValues = []) {
        state.optionValues = optionValues;
    },
    [types.SET_OPTION_VALUE_FOR_LANGUAGE_CODE](state, { languageCode, index, value }) {
        state.optionValues[languageCode][index] = value;
        state.optionValues = {
            ...state.optionValues,
        };
    },
    [types.SET_OPTION_VALUE](state, { index, value }) {
        state.optionValues[index] = value;
        state.optionValues = [
            ...state.optionValues,
        ];
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
