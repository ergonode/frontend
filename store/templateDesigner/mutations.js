/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    updateLayoutElementBounds: (state, { index, width, height }) => {
        state.layoutElements[index] = { ...state.layoutElements[index], width, height };
        state.layoutElements = [...state.layoutElements];
    },
    updateLayoutElementPosition: (state, { index, row, column }) => {
        state.layoutElements[index] = { ...state.layoutElements[index], row, column };
        state.layoutElements = [...state.layoutElements];
    },
    addElementToLayoutAtCoordinates: (state, payload) => {
        const { index, element } = payload;

        state.templateLayout[index] = element;
        state.templateLayout = [...state.templateLayout];
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
        const element = state.templateLayout[index];

        state.templateLayout[index] = { ...element, label: title };
        state.templateLayout = [...state.templateLayout];
    },
    clearStorage: (state) => {
        state.templateLayout = [];
        state.title = '';
        state.image = null;
        state.types = [];
    },
};
