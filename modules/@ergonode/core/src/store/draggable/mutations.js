/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DRAGGABLE_STATE: 'SET_DRAGGABLE_STATE',
    SET_DRAGGED_ELEMENT: 'SET_DRAGGED_ELEMENT',
    SET_DRAGGED_EL_INDEX: 'SET_DRAGGED_EL_INDEX',
    SET_GHOST_INDEX: 'SET_GHOST_INDEX',
};

export default {
    [types.SET_DRAGGABLE_STATE](state, {
        propName, value,
    }) {
        state[propName] = value;
    },
    [types.SET_GHOST_INDEX](state, index = -1) {
        state.ghostIndex = index;
    },
    [types.SET_DRAGGED_EL_INDEX](state, index = -1) {
        state.draggedElIndex = index;
    },
    [types.SET_DRAGGED_ELEMENT](state, element = null) {
        state.draggedElement = element;
    },
};
