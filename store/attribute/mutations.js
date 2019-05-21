/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setAttributeID: (state, { id }) => {
        state.id = id;
    },
    initializeOptionKeys: (state, { optionKeys }) => {
        state.optionKeys = optionKeys;
    },
    addAttributeOptionKey: (state, { key }) => {
        state.optionKeys.push(key);
    },
    removeAttributeOptionKey: (state, { index }) => {
        state.optionKeys.splice(index, 1);
    },
    setMultilingualAttribute: (state, { isMultilingual }) => {
        state.isMultilingual = isMultilingual;
    },
    setAttributeOptionKey: (state, { index, key }) => {
        state.optionKeys[index] = key;
        state.optionKeys = [...state.optionKeys];
    },
    setAttributeCode: (state, { code }) => {
        state.code = code;
    },
    setAttributeParameter: (state, { parameter }) => {
        state.parameter = parameter;
    },
    setAttributeGroups: (state, { groups }) => {
        state.groups = groups;
    },
    setAttributeType: (state, { type }) => {
        state.type = type;
    },
    clearStorage: (state) => {
        state.id = null;
        state.code = '';
        state.groups = [];
        state.type = '';
        state.parameter = '';
        state.optionKeys = [];
        state.isMultilingual = true;
    },
};
