/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import {
    getMappedLayoutElements,
    getMappedLayoutElement,
    getMappedLayoutSectionElement,
} from '~/model/mappers/templateMapper';

export default {
    getTemplateByID(
        { commit, getters },
        { path, onError },
    ) {
        return this.app.$axios.$get(path).then(({
            name,
            image_id: imageID,
            elements,
        }) => {
            const { elementDataByType } = getters;
            const layoutElements = getMappedLayoutElements(
                elements,
                elementDataByType,
            );

            commit(types.INITIALIZE_LAYOUT_ELEMENTS, layoutElements);
            commit(types.SET_TEMPLATE_DESIGNER_TITLE, name);
            commit(types.SET_TEMPLATE_DESIGNER_IMAGE, imageID);
        }).catch(e => onError(e.data));
    },
    updateTemplateDesigner(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/templates/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    createTemplateDesigner(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/templates`, data).then(({ id }) => {
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    getTypes({ commit }, {
        path, params, onSuccess, onError,
    }) {
        return this.app.$axios.$get(path, { params }).then(({ collection }) => {
            commit(types.SET_TYPES, collection);
            onSuccess();
        }).catch(e => onError(e.data));
    },
    addListElementToLayout: ({
        commit, rootState, rootGetters, getters,
    }, position) => {
        const { draggedElement } = rootState.draggable;
        const { 'list/elementByCode': elementByCode } = rootGetters;
        const { elementDataByType } = getters;
        const element = elementByCode(draggedElement.split(':')[0]);
        const layoutElement = getMappedLayoutElement(
            element.id,
            elementDataByType(element.type),
            position,
        );

        commit(types.ADD_ELEMENT_TO_LAYOUT, layoutElement);
    },
    addSectionElementToLayout: ({
        commit, getters,
    }, { row, column, title }) => {
        const { elementDataByType } = getters;
        const layoutElement = getMappedLayoutSectionElement(
            title,
            elementDataByType('SECTION'),
            { row, column },
        );

        commit(types.ADD_ELEMENT_TO_LAYOUT, layoutElement);
    },
    updateLayoutElementBounds: ({ commit }, bounds) => {
        commit(types.UPDATE_LAYOUT_ELEMENT_BOUNDS, bounds);
    },
    updateLayoutElementPosition: ({ commit }, position) => {
        commit(types.UPDATE_LAYOUT_ELEMENT_POSITION, position);
    },
    updateSectionElementTitle: ({ commit }, title) => {
        commit(types.UPDATE_SECTION_ELEMENT_TITLE, title);
    },
    removeLayoutElementAtIndex: ({ commit }, index) => {
        commit(types.REMOVE_LAYOUT_ELEMENT_AT_INDEX, index);
    },
    setTemplateDesignerTitle: ({ commit }, title) => {
        commit(types.SET_TEMPLATE_DESIGNER_TITLE, title);
    },
    setTemplateDesignerImage: ({ commit }, image) => {
        commit(types.SET_TEMPLATE_DESIGNER_IMAGE, image);
    },
    setLayoutElementRequirement: ({ commit }, payload) => {
        commit(types.SET_LAYOUT_ELEMENT_REQUIREMENT, payload);
    },
    clearStorage: ({ commit }) => commit(types.CLEAR_STATE),
};
