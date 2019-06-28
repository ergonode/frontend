/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

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

            commit('initializeLayoutElements', layoutElements);
            commit('setTemplateDesignerTitle', name);
            commit('setTemplateDesignerImage', imageID);
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
        return this.app.$axios.$get(path, { params }).then(({ collection: types }) => {
            commit('setTypes', types);
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

        commit('addElementToLayout', layoutElement);
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

        commit('addElementToLayout', layoutElement);
    },
    updateLayoutElementBounds: ({ commit }, payload) => commit('updateLayoutElementBounds', payload),
    updateLayoutElementPosition: ({ commit }, payload) => commit('updateLayoutElementPosition', payload),
    updateSectionElementTitle: ({ commit }, payload) => commit('updateSectionElementTitle', payload),
    removeLayoutElementAtIndex: ({ commit }, index) => commit('removeLayoutElementAtIndex', index),
    setTemplateDesignerTitle: ({ commit }, title) => commit('setTemplateDesignerTitle', title),
    setTemplateDesignerImage: ({ commit }, image) => commit('setTemplateDesignerImage', image),
    setLayoutElementRequirement: ({ commit }, payload) => commit('setLayoutElementRequirement', payload),
    clearStorage: ({ commit }) => commit('clearStorage'),
};
