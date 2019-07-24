/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    updateXBound({ commit }, x) {
        commit(types.SET_X_BOUNDS, x);
    },
    setDraggableState({ commit }, { propName, value }) {
        commit(types.SET_DRAGGABLE_STATE, { propName, value });
    },
    setDraggedElIndex({ commit }, index) {
        commit(types.SET_DRAGGED_EL_INDEX, index);
    },
    setBounds({ commit }, bounds) {
        commit(types.SET_BOUNDS, bounds);
    },
    setGhostIndex({ commit }, index) {
        commit(types.SET_GHOST_INDEX, index);
    },
    setDraggedElementProperty({ commit }, { propName, value }) {
        commit(types.SET_DRAGGED_ELEMENT_PROPERTY, { propName, value });
    },
    setDraggedElement({ commit }, element = null) {
        commit(types.SET_DRAGGED_ELEMENT, element);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
