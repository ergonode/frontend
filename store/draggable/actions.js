/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setDraggableState: ({ commit }, { propName, value }) => commit('setDraggableState', { propName, value }),
    setDraggedElementProperty: ({ commit }, { propName, value }) => commit('setDraggedElementProperty', { propName, value }),
    setDraggedElement: ({ commit }, element = null) => {
        commit('setDraggedElement', element);
    },
};
