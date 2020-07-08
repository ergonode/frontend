/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_DISABLED_ELEMENT: 'SET_DISABLED_ELEMENT',
    SET_DISABLED_ELEMENTS: 'SET_DISABLED_ELEMENTS',
    SET_GROUP_ELEMENTS_COUNT: 'SET_GROUP_ELEMENTS_COUNT',
    REMOVE_DISABLED_ELEMENT: 'REMOVE_DISABLED_ELEMENT',
    CLEAR_STATE: 'CLEAR_STATE',
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
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
