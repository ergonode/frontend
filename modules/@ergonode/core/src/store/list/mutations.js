/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DISABLED_ELEMENT: 'SET_DISABLED_ELEMENT',
    SET_DISABLED_ELEMENTS: 'SET_DISABLED_ELEMENTS',
    SET_GROUP_ELEMENTS_COUNT: 'SET_GROUP_ELEMENTS_COUNT',
    REMOVE_DISABLED_ELEMENT: 'REMOVE_DISABLED_ELEMENT',
};

export default {
    [types.SET_DISABLED_ELEMENT](state, {
        languageCode, elementId, disabled,
    }) {
        state.disabledElements[languageCode] = {
            ...state.disabledElements[languageCode],
            [elementId]: disabled,
        };
        state.disabledElements = {
            ...state.disabledElements,
        };
    },
    [types.SET_DISABLED_ELEMENTS](state, disabledElements) {
        state.disabledElements = disabledElements;
    },
    [types.REMOVE_DISABLED_ELEMENT](state, {
        languageCode, elementId,
    }) {
        delete state.disabledElements[languageCode][elementId];
        state.disabledElements[languageCode] = {
            ...state.disabledElements[languageCode],
        };
    },
};
