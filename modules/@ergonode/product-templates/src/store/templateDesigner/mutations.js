/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    UPDATE_LAYOUT_ELEMENT_BOUNDS: 'UPDATE_LAYOUT_ELEMENT_BOUNDS',
    UPDATE_LAYOUT_ELEMENT_POSITION: 'UPDATE_LAYOUT_ELEMENT_POSITION',
    ADD_ELEMENT_TO_LAYOUT: 'ADD_ELEMENT_TO_LAYOUT',
    SET_LAYOUT_ELEMENT_REQUIREMENT: 'SET_LAYOUT_ELEMENT_REQUIREMENT',
    REMOVE_LAYOUT_ELEMENT_AT_INDEX: 'REMOVE_LAYOUT_ELEMENT_AT_INDEX',
    UPDATE_SECTION_ELEMENT_TITLE: 'UPDATE_SECTION_ELEMENT_TITLE',
};

export default {
    [types.UPDATE_LAYOUT_ELEMENT_BOUNDS](state, {
        index, width, height,
    }) {
        state.layoutElements[index] = {
            ...state.layoutElements[index],
            width,
            height,
        };
        state.layoutElements = [
            ...state.layoutElements,
        ];
    },
    [types.UPDATE_LAYOUT_ELEMENT_POSITION](state, {
        index, row, column,
    }) {
        state.layoutElements[index] = {
            ...state.layoutElements[index],
            row,
            column,
        };
        state.layoutElements = [
            ...state.layoutElements,
        ];
    },
    [types.ADD_ELEMENT_TO_LAYOUT](state, layoutElement) {
        state.layoutElements.push(layoutElement);
    },
    [types.SET_LAYOUT_ELEMENT_REQUIREMENT](state, {
        required, index,
    }) {
        const element = state.layoutElements[index];

        state.layoutElements[index] = {
            ...element,
            required,
        };
        state.layoutElements = [
            ...state.layoutElements,
        ];
    },
    [types.REMOVE_LAYOUT_ELEMENT_AT_INDEX](state, index) {
        state.layoutElements.splice(index, 1);
    },
    [types.UPDATE_SECTION_ELEMENT_TITLE](state, {
        index, title,
    }) {
        state.layoutElements[index].label = title;
        state.layoutElements = [
            ...state.layoutElements,
        ];
    },
};
