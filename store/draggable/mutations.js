/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DRAGGABLE_STATE: 'SET_DRAGGABLE_STATE',
    SET_DRAGGED_ELEMENT: 'SET_DRAGGED_ELEMENT',
    SET_DRAGGED_EL_INDEX: 'SET_DRAGGED_EL_INDEX',
    SET_DRAGGED_ELEMENT_PROPERTY: 'SET_DRAGGED_ELEMENT_PROPERTY',
    SET_GHOST_INDEX: 'SET_GHOST_INDEX',
    SET_BOUNDS: 'SET_BOUNDS',
    SET_X_BOUNDS: 'SET_X_BOUNDS',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_DRAGGABLE_STATE](state, { propName, value }) {
        state[propName] = value;
    },
    [types.SET_GHOST_INDEX](state, index = -1) {
        state.ghostIndex = index;
    },
    [types.SET_DRAGGED_EL_INDEX](state, index = -1) {
        state.draggedElIndex = index;
    },
    [types.SET_BOUNDS](state, bounds = null) {
        state.bounds = bounds;
    },
    [types.SET_X_BOUNDS](state, x) {
        state.bounds = { ...state.bounds, x };
    },
    [types.SET_DRAGGED_ELEMENT](state, element = null) {
        state.draggedElement = element;
    },
    [types.SET_DRAGGED_ELEMENT_PROPERTY](state, { propName, value }) {
        state.draggedElement[propName] = value;
    },
    [types.CLEAR_STATE](state) {
        state.isListElementDragging = false;
        state.isColumnDragging = false;
        state.isFilterDragging = false;
        state.draggedElement = null;
    },
};
