/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    INITIALIZE_ELEMENTS_FOR_LANGUAGE: 'INITIALIZE_ELEMENTS_FOR_LANGUAGE',
    SET_GROUPS_FOR_LANGUAGE: 'SET_GROUPS_FOR_LANGUAGE',
    ADD_ELEMENTS_FOR_LANGUAGE: 'ADD_ELEMENTS_FOR_LANGUAGE',
    SET_ELEMENTS_FOR_LANGUAGE: 'SET_ELEMENTS_FOR_LANGUAGE',
    SET_FILTER: 'SET_FILTER',
    SET_DISABLED_ELEMENT: 'SET_DISABLED_ELEMENT',
    SET_GROUP_ELEMENTS_COUNT: 'SET_GROUP_ELEMENTS_COUNT',
    REMOVE_DISABLED_ELEMENT: 'REMOVE_DISABLED_ELEMENT',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.INITIALIZE_ELEMENTS_FOR_LANGUAGE](state, { languageCode }) {
        state.elements[languageCode] = [];
    },
    [types.SET_FILTER](state, filter) {
        state.filter = filter;
    },
    [types.SET_GROUPS_FOR_LANGUAGE](state, { languageCode, groups }) {
        state.groups[languageCode] = groups;
        state.groups = { ...state.groups };
    },
    [types.SET_GROUP_ELEMENTS_COUNT](state, { groupId, elementsCount }) {
        state.groupElementsCount[groupId] = elementsCount;
        state.groupElementsCount = { ...state.groupElementsCount };
    },
    [types.ADD_ELEMENTS_FOR_LANGUAGE](state, { languageCode, elements }) {
        state.elements[languageCode] = [...state.elements[languageCode], ...elements];
        state.elements = { ...state.elements };
    },
    [types.SET_ELEMENTS_FOR_LANGUAGE](state, { languageCode, elements }) {
        state.elements[languageCode] = elements;
        state.elements = { ...state.elements };
    },
    [types.SET_DISABLED_ELEMENT](state, { languageCode, elementId }) {
        state.disabledElements[languageCode] = {
            ...state.disabledElements[languageCode], [elementId]: true,
        };
        state.disabledElements = { ...state.disabledElements };
    },
    [types.REMOVE_DISABLED_ELEMENT](state, { languageCode, elementId }) {
        delete state.disabledElements[languageCode][elementId];
        state.disabledElements[languageCode] = { ...state.disabledElements[languageCode] };
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
