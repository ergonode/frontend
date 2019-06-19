/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    updateLayoutElementBounds: (state, { index, width, height }) => {
        state.layoutElements[index] = { ...state.layoutElements[index], width, height };
        state.layoutElements = [...state.layoutElements];
    },
    updateLayoutElementPosition: (state, element) => {
        state.layoutElements.push(element);
    },
    addListElementToLayout: (state, layoutElement) => {
        state.layoutElements.push(layoutElement);
    },
    setTypes: (state, { types }) => {
        state.types = types;
    },
    setLayoutElementRequirement: (state, payload) => {
        const { required, index } = payload;
        const element = state.layoutElements[index];

        state.layoutElements[index] = { ...element, required };
        state.layoutElements = [...state.layoutElements];
    },
    removeLayoutElementAtIndex: (state, index) => {
        state.layoutElements.splice(index, 1);
    },
    setTemplateDesignerTitle: (state, { title }) => {
        state.title = title;
    },
    setTemplateDesignerImage: (state, { image }) => {
        state.image = image;
    },
    setTemplateDesignerSectionTitle: (state, payload) => {
        const { index, title } = payload;
        const element = state.layoutElements[index];

        state.layoutElements[index] = { ...element, label: title };
        state.layoutElements = [...state.layoutElements];
    },
    clearStorage: (state) => {
        state.layoutElements = [];
        state.title = '';
        state.image = null;
        state.types = [];
    },
};
