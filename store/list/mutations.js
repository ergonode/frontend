/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list';

export const types = {
    SET_GROUPS_FOR_LANGUAGE: 'SET_GROUPS_FOR_LANGUAGE',
    SET_ELEMENTS_FOR_LANGUAGE: 'SET_ELEMENTS_FOR_LANGUAGE',
    SET_GROUPS_ELEMENTS_COUNT: 'SET_GROUPS_ELEMENTS_COUNT',
    SET_GROUPS_ELEMENTS_COUNT_FOR_UNASSIGNED_ELEMENTS: 'SET_GROUPS_ELEMENTS_COUNT_FOR_UNASSIGNED_ELEMENTS',
    SET_FILTER: 'SET_FILTER',
    SET_DISABLED_ELEMENT: 'SET_DISABLED_ELEMENT',
    SET_GROUP_ELEMENTS_COUNT: 'SET_GROUP_ELEMENTS_COUNT',
    REMOVE_DISABLED_ELEMENT: 'REMOVE_DISABLED_ELEMENT',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_ELEMENTS_FOR_LANGUAGE](state, { languageCode, elements }) {
        state.elements[languageCode] = elements;
        state.elements = { ...state.elements };
    },
    [types.SET_GROUPS_ELEMENTS_COUNT](state, groupsElementsCount) {
        state.groupsElementsCount = groupsElementsCount;
    },
    [types.SET_GROUPS_ELEMENTS_COUNT_FOR_UNASSIGNED_ELEMENTS](state, groupElementsCount) {
        state.groupsElementsCount[UNASSIGNED_GROUP_ID] = groupElementsCount;
    },
    [types.SET_FILTER](state, filter) {
        state.filter = filter;
    },
    [types.SET_GROUPS_FOR_LANGUAGE](state, { languageCode, groups }) {
        state.groups[languageCode] = groups;
        state.groups = { ...state.groups };
    },
    [types.SET_DISABLED_ELEMENT](state, { languageCode, elementId, disabled }) {
        state.disabledElements[languageCode] = {
            ...state.disabledElements[languageCode], [elementId]: disabled,
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
