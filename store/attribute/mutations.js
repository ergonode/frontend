/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import types from './mutation-types';

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
    [types.SET_ATTRIBUTE_TYPE](state, type) {
        state.type = type;
    },
    [types.CLEAR_STATE](state) {
        state.id = null;
        state.code = '';
        state.groups = [];
        state.type = '';
        state.parameter = '';
        state.optionKeys = [];
        state.optionValues = [];
        state.isMultilingual = true;
    },
};
