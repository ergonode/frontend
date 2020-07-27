/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    setDraggableState({
        commit,
    }, {
        propName, value,
    }) {
        commit(types.SET_DRAGGABLE_STATE, {
            propName,
            value,
        });
    },
    setDraggedElIndex({
        commit,
    }, index) {
        commit(types.SET_DRAGGED_EL_INDEX, index);
    },
    setGhostIndex({
        commit,
    }, index) {
        commit(types.SET_GHOST_INDEX, index);
    },
    setDraggedElement({
        commit,
    }, element = null) {
        commit(types.SET_DRAGGED_ELEMENT, element);
    },
};
