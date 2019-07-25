/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setDraggableState({ commit }, { propName, value }) {
        commit(types.SET_DRAGGABLE_STATE, { propName, value });
    },
    setGhostElTransform({ commit }, transform) {
        commit(types.SET_GHOST_ELEMENT_TRANSFORM, transform);
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
