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
import { getNestedObjectByKeyWithValue } from '~/model/objectWrapper';

const onDefaultError = () => {};

export default {
    getTemplateByID(
        {
            commit, dispatch, getters, rootState,
        },
        { path },
    ) {
        return this.app.$axios.$get(path).then(({
            name,
            image_id: imageID,
            elements,
        }) => {
            const { elementDataByType } = getters;
            const { language: languageCode } = rootState.authentication.user;
            const layoutElements = getMappedLayoutElements(
                elements,
                elementDataByType,
            );

            for (let i = layoutElements.length - 1; i > -1; i -= 1) {
                const { id } = layoutElements[i];
                dispatch('list/setDisabledElement', { languageCode, elementId: id }, { root: true });
            }

            commit(types.INITIALIZE_LAYOUT_ELEMENTS, layoutElements);
            commit(types.SET_TEMPLATE_DESIGNER_TITLE, name);
            commit(types.SET_TEMPLATE_DESIGNER_IMAGE, imageID);
        }).catch(onDefaultError);
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
        path, params,
    }) {
        return this.app.$axios.$get(path, { params }).then(({ collection }) => {
            commit(types.SET_TYPES, collection);
        }).catch(onDefaultError);
    },
    addListElementToLayout: ({
        commit, dispatch, rootState, getters,
    }, position) => {
        const { draggedElement } = rootState.draggable;
        const { elements } = rootState.list;
        const { elementDataByType } = getters;
        const [value, languageCode] = draggedElement.split(':');
        const element = getNestedObjectByKeyWithValue(elements, 'code', value);
        const layoutElement = getMappedLayoutElement(
            element.id,
            elementDataByType(element.type),
            position,
        );

        dispatch('list/setDisabledElement', { languageCode, elementId: element.id }, { root: true });
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
    removeLayoutElementAtIndex: ({
        commit, dispatch, state, rootState,
    }, index) => {
        const { layoutElements } = state;
        const { user } = rootState.authentication;
        dispatch('list/removeDisabledElement', { languageCode: user.language, elementId: layoutElements[index].id }, { root: true });
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
