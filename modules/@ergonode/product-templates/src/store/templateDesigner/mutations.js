/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    INITIALIZE_LAYOUT_ELEMENTS: 'INITIALIZE_LAYOUT_ELEMENTS',
    UPDATE_LAYOUT_ELEMENT_BOUNDS: 'UPDATE_LAYOUT_ELEMENT_BOUNDS',
    UPDATE_LAYOUT_ELEMENT_POSITION: 'UPDATE_LAYOUT_ELEMENT_POSITION',
    ADD_ELEMENT_TO_LAYOUT: 'ADD_ELEMENT_TO_LAYOUT',
    SET_TYPES: 'SET_TYPES',
    SET_LAYOUT_ELEMENT_REQUIREMENT: 'SET_LAYOUT_ELEMENT_REQUIREMENT',
    REMOVE_LAYOUT_ELEMENT_AT_INDEX: 'REMOVE_LAYOUT_ELEMENT_AT_INDEX',
    SET_TEMPLATE_DESIGNER_TITLE: 'SET_TEMPLATE_DESIGNER_TITLE',
    SET_TEMPLATE_DESIGNER_IMAGE: 'SET_TEMPLATE_DESIGNER_IMAGE',
    UPDATE_SECTION_ELEMENT_TITLE: 'UPDATE_SECTION_ELEMENT_TITLE',
    SET_DEFAULT_TEXT_ATTRIBUTE: 'SET_DEFAULT_TEXT_ATTRIBUTE',
    SET_DEFAULT_IMAGE_ATTRIBUTE: 'SET_DEFAULT_IMAGE_ATTRIBUTE',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.INITIALIZE_LAYOUT_ELEMENTS](state, elements) {
        state.layoutElements = elements;
    },
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
    [types.SET_TYPES](state, attrTypes) {
        state.types = attrTypes;
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
    [types.SET_TEMPLATE_DESIGNER_TITLE](state, title) {
        state.title = title;
    },
    [types.SET_TEMPLATE_DESIGNER_IMAGE](state, image) {
        state.image = image;
    },
    [types.SET_DEFAULT_TEXT_ATTRIBUTE](state, defaultTextAttribute) {
        state.defaultTextAttribute = defaultTextAttribute;
    },
    [types.SET_DEFAULT_IMAGE_ATTRIBUTE](state, defaultImageAttribute) {
        state.defaultImageAttribute = defaultImageAttribute;
    },
    [types.UPDATE_SECTION_ELEMENT_TITLE](state, {
        index, title,
    }) {
        state.layoutElements[index].label = title;
        state.layoutElements = [
            ...state.layoutElements,
        ];
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
