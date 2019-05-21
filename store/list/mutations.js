/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    initializeElementsForLanguage: (state, { languageCode }) => {
        state.elements[languageCode] = [];
    },
    addGroupsForLanguage: (state, { languageCode, group }) => {
        state.groups[languageCode].push(group);
    },
    setGroupsForLanguage: (state, { languageCode, groups }) => {
        state.groups[languageCode] = groups;
        state.groups = { ...state.groups };
    },
    setElementsForLanguage: (state, { languageCode, elements }) => {
        state.elements[languageCode] = [...state.elements[languageCode], ...elements];
        state.elements = { ...state.elements };
    },
    setConfigurationForList: (state, [stateName, stateValue]) => {
        state[stateName] = stateValue;
    },
    clearStorage: (state) => {
        state.groups = {};
        state.elements = {};
        state.elementsAreMultiDraggable = true;
        state.isListMultilingual = true;
        state.draggedElementsStore = {};
    },
};
