/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_STATE_PROPERTY: 'SET_STATE_PROPERTY',
    UPDATE_LAYOUT_ELEMENT_AT_INDEX: 'UPDATE_LAYOUT_ELEMENT_AT_INDEX',
    ADD_ELEMENT_TO_LAYOUT: 'ADD_ELEMENT_TO_LAYOUT',
    REMOVE_LAYOUT_ELEMENT_AT_INDEX: 'REMOVE_LAYOUT_ELEMENT_AT_INDEX',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_STATE_PROPERTY](state, {
        key,
        value,
    }) {
        state[key] = value;
    },
    [types.UPDATE_LAYOUT_ELEMENT_AT_INDEX](state, {
        index,
        element,
    }) {
        state.layoutElements[index] = {
            ...state.layoutElements[index],
            ...element,
        };
        state.layoutElements = [
            ...state.layoutElements,
        ];
    },
    [types.ADD_ELEMENT_TO_LAYOUT](state, layoutElement) {
        state.layoutElements.push(layoutElement);
    },
    [types.REMOVE_LAYOUT_ELEMENT_AT_INDEX](state, index) {
        state.layoutElements.splice(index, 1);
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
