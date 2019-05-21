/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setDraggableState: (state, { propName, value }) => {
        state[propName] = value;
    },
    setDraggedElement: (state, element = null) => {
        state.draggedElement = element;
    },
    setDraggedElementProperty: (state, { propName, value }) => {
        state.draggedElement[propName] = value;
    },
    clearStorage: (state) => {
        state.isListElementDragging = false;
        state.isColumnDragging = false;
        state.isFilterDragging = false;
        state.draggedElement = null;
    },
};
