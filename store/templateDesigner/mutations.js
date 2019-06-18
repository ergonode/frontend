/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    initializeDraggedElementCollision: (state, payload) => {
        state.isDraggedElementColliding = payload;
    },
    updateObstacleStageOfElement: (state, payload) => {
        const { index, isObstacle } = payload;
        const element = state.templateLayout[index];

        state.templateLayout[index] = { ...element, isObstacle };
        state.templateLayout = [...state.templateLayout];
    },
    updateLayoutElementBounds: (state, { index, width, height }) => {
        state.layoutElements[index] = { ...state.layoutElements[index], width, height };
        state.layoutElements = [...state.layoutElements];
    },
    updateLayoutElementPosition: (state, { index, row, column }) => {
        state.layoutElements[index] = { ...state.layoutElements[index], row, column };
        state.layoutElements = [...state.layoutElements];
    },
    setTemplateDesignerLayout: (state, payload) => {
        state.templateLayout = payload;
    },
    addElementToLayoutAtCoordinates: (state, payload) => {
        const { index, element } = payload;

        state.templateLayout[index] = element;
        state.templateLayout = [...state.templateLayout];
    },
    addListElementToLayout: (state, layoutElement) => {
        state.layoutElements.push(layoutElement);
    },
    insertElementToLayout: (state, payload) => {
        const { index, element } = payload;
        state.templateLayout.splice(index, 0, element);
    },
    setTypes: (state, { types }) => {
        state.types = types;
    },
    setElementRequirement: (state, payload) => {
        const { required, index } = payload;
        const element = state.templateLayout[index];

        state.templateLayout[index] = { ...element, required };
        state.templateLayout = [...state.templateLayout];
    },
    updateLayoutElementCoordinates: (state, payload) => {
        const { index, coordinates } = payload;
        const element = state.templateLayout[index];

        state.templateLayout[index] = { ...element, coordinates };
        state.templateLayout = [...state.templateLayout];
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
        state.isDraggedElementColliding = false;
        state.title = '';
        state.image = null;
        state.types = [];
    },
};
