/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    UPDATE_LAYOUT_ELEMENT_AT_INDEX: 'UPDATE_LAYOUT_ELEMENT_AT_INDEX',
    ADD_ELEMENT_TO_LAYOUT: 'ADD_ELEMENT_TO_LAYOUT',
    REMOVE_LAYOUT_ELEMENT_AT_INDEX: 'REMOVE_LAYOUT_ELEMENT_AT_INDEX',
};

export default {
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
};
