/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    INITIALIZE_ELEMENTS_FOR_LANGUAGE: 'INITIALIZE_ELEMENTS_FOR_LANGUAGE',
    SET_GROUPS_FOR_LANGUAGE: 'SET_GROUPS_FOR_LANGUAGE',
    SET_ELEMENTS_FOR_LANGUAGE: 'SET_ELEMENTS_FOR_LANGUAGE',
    SET_DISABLED_ELEMENT: 'SET_DISABLED_ELEMENT',
    REMOVE_DISABLED_ELEMENT: 'REMOVE_DISABLED_ELEMENT',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.INITIALIZE_ELEMENTS_FOR_LANGUAGE](state, { languageCode }) {
        state.elements[languageCode] = [];
    },
    [types.SET_GROUPS_FOR_LANGUAGE](state, { languageCode, groups }) {
        state.groups[languageCode] = groups;
        state.groups = { ...state.groups };
    },
    [types.SET_ELEMENTS_FOR_LANGUAGE](state, { languageCode, elements }) {
        state.elements[languageCode] = [...state.elements[languageCode], ...elements];
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
