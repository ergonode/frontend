/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default () => ({
    isListElementDragging: false,
    isColumnDragging: false,
    isFilterDragging: false,
    draggedElement: null,
    bounds: null,
    ghostIndex: -1,
    draggedElIndex: -1,
    ghostElTransform: 0,
});
