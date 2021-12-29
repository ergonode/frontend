/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DISABLED_ELEMENT: 'SET_DISABLED_ELEMENT',
    SET_DISABLED_SCOPE_ELEMENT: 'SET_DISABLED_SCOPE_ELEMENT',
    SET_DISABLED_ELEMENT_SCOPE: 'SET_DISABLED_ELEMENT_SCOPE',
    SET_DISABLED_ELEMENT_SCOPE_LANGUAGE: 'SET_DISABLED_ELEMENT_SCOPE_LANGUAGE',
    SET_DISABLED_ELEMENTS: 'SET_DISABLED_ELEMENTS',
    SET_GROUP_ELEMENTS_COUNT: 'SET_GROUP_ELEMENTS_COUNT',
    REMOVE_DISABLED_ELEMENT: 'REMOVE_DISABLED_ELEMENT',
    REMOVE_DISABLED_SCOPE_ELEMENT: 'REMOVE_DISABLED_SCOPE_ELEMENT',
    REMOVE_DISABLED_SCOPE_ELEMENTS: 'REMOVE_DISABLED_SCOPE_ELEMENTS',
};

export default {
    [types.SET_DISABLED_ELEMENT_SCOPE](state, scope = 'default') {
        state.disabledElements[scope] = {};
    },
    [types.SET_DISABLED_ELEMENT_SCOPE_LANGUAGE](state, {
        scope = 'default',
        languageCode,
    }) {
        state.disabledElements[scope][languageCode] = {};
    },
    [types.SET_DISABLED_SCOPE_ELEMENT](state, {
        scope = 'default',
        languageCode,
        elementId,
        disabled,
    }) {
        state.disabledElements[scope][languageCode][elementId] = disabled;

        state.disabledElements = {
            ...state.disabledElements,
        };
    },
    [types.SET_DISABLED_ELEMENTS](state, disabledElements) {
        state.disabledElements = disabledElements;
    },
    [types.REMOVE_DISABLED_SCOPE_ELEMENT](state, {
        scope,
        languageCode,
        elementId,
    }) {
        delete state.disabledElements[scope][languageCode][elementId];

        state.disabledElements[scope] = {
            ...state.disabledElements[scope],
        };
    },
    [types.REMOVE_DISABLED_SCOPE_ELEMENTS](state, scope) {
        delete state.disabledElements[scope];

        state.disabledElements = {
            ...state.disabledElements,
        };
    },
    /**
     * @deprecated since 1.1.0
     */
    [types.SET_DISABLED_ELEMENT](state, {
        languageCode,
        elementId,
        disabled,
    }) {
        state.disabledElements[languageCode] = {
            ...state.disabledElements[languageCode],
            [elementId]: disabled,
        };

        state.disabledElements = {
            ...state.disabledElements,
        };
    },
    /**
     * @deprecated since 1.1.0
     */
    [types.REMOVE_DISABLED_ELEMENT](state, {
        languageCode,
        elementId,
    }) {
        delete state.disabledElements[languageCode][elementId];

        state.disabledElements = {
            ...state.disabledElements,
        };
    },
};
