/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    getTemplateByID(
        { commit },
        { path, onError },
    ) {
        return this.app.$axios.$get(path).then(({
            name,
            image_id: imageID,
            /**
            sections,
            elements, */
        }) => {
            // TODO: Map elements
            commit('setTemplateDesignerTitle', { title: name });
            commit('setTemplateDesignerImage', { image: imageID });
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
            commit('setTypes', { types });
            onSuccess();
        }).catch(e => onError(e.data));
    },
    addListElementToLayout: ({
        commit, rootState, rootGetters, getters,
    }, { row, column }) => {
        const { draggedElement } = rootState.draggable;
        const { 'list/elementByCode': elementByCode } = rootGetters;
        const { elementDataByType } = getters;
        const {
            id,
            type,
            label,
        } = elementByCode(draggedElement.split(':')[0]);
        const {
            min_width: minWidth,
            min_height: minHeight,
            max_width: maxWidth,
            max_height: maxHeight,
        } = elementDataByType(type);
        const layoutElement = {
            id,
            row,
            column,
            width: 1,
            height: 1,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            type,
            label,
            required: false,
        };

        commit('addElementToLayout', layoutElement);
    },
    addSectionElementToLayout: ({
        commit, state,
    }, { row, column, title }) => {
        const { types } = state;
        const [sectionType] = types.filter(type => type.type === 'SECTION');
        const {
            min_width: minWidth,
            min_height: minHeight,
            max_width: maxWidth,
            max_height: maxHeight,
        } = sectionType;
        const layoutElement = {
            id: Math.random().toString(36).substr(2, 9),
            row,
            column,
            width: 1,
            height: 1,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            type: 'SECTION TITLE',
            label: title,
        };

        commit('addElementToLayout', layoutElement);
    },
    updateLayoutElementBounds: ({ commit }, { index, width, height }) => commit('updateLayoutElementBounds', { index, width, height }),
    updateLayoutElementPosition: ({ commit }, payload) => commit('updateLayoutElementPosition', payload),
    updateSectionElementTitle: ({ commit }, payload) => {
        commit('updateSectionElementTitle', payload);
    },
    removeLayoutElementAtIndex: ({ commit }, index) => commit('removeLayoutElementAtIndex', index),
    setTemplateDesignerTitle: ({ commit }, { title }) => commit('setTemplateDesignerTitle', { title }),
    setTemplateDesignerImage: ({ commit }, { image }) => commit('setTemplateDesignerImage', { image }),
    setLayoutElementRequirement: ({ commit }, payload) => commit('setLayoutElementRequirement', payload),
    clearStorage: ({ commit }) => commit('clearStorage'),
};
