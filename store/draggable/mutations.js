/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_DRAGGABLE_STATE: 'SET_DRAGGABLE_STATE',
    SET_DRAGGED_ELEMENT: 'SET_DRAGGED_ELEMENT',
    SET_DRAGGED_EL_INDEX: 'SET_DRAGGED_EL_INDEX',
    SET_DRAGGED_ELEMENT_PROPERTY: 'SET_DRAGGED_ELEMENT_PROPERTY',
    SET_GHOST_INDEX: 'SET_GHOST_INDEX',
    SET_RESIZING_ELEMENT: 'SET_RESIZING_ELEMENT',
    SET_GHOST_FILTER_INDEX: 'SET_GHOST_FILTER_INDEX',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_DRAGGABLE_STATE](state, { propName, value }) {
        state[propName] = value;
    },
    [types.SET_GHOST_INDEX](state, index = -1) {
        state.ghostIndex = index;
    },
    [types.SET_RESIZING_ELEMENT](state, element = null) {
        state.resizingElement = element;
    },
    [types.SET_GHOST_FILTER_INDEX](state, index = -1) {
        state.ghostFilterIndex = index;
    },
    [types.SET_DRAGGED_EL_INDEX](state, index = -1) {
        state.draggedElIndex = index;
    },
    [types.SET_DRAGGED_ELEMENT](state, element = null) {
        state.draggedElement = element;
    },
    [types.SET_DRAGGED_ELEMENT_PROPERTY](state, { propName, value }) {
        state.draggedElement[propName] = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
