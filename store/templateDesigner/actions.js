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
            sections,
            elements,
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

        commit('addListElementToLayout', layoutElement);
    },
    addElementToLayoutAtCoordinates: ({ commit, getters }, { elementToAdd }) => {
        const index = getters.layoutElementIndex(
            elementToAdd.coordinates.xPos.start,
            elementToAdd.coordinates.yPos.start,
        );

        commit('addElementToLayoutAtCoordinates', {
            index,
            element: elementToAdd,
        });
    },
    updateLayoutElementCoordinates: ({ commit, getters }, payload) => {
        const index = getters.layoutElementIndex(
            payload.xPos.start,
            payload.yPos.start,
        );

        commit('updateLayoutElementCoordinates', {
            index,
            coordinates: payload,
        });
    },
    updateObstaclesAtPoints: ({ commit, getters }, { points, isObstacle }) => {
        points.forEach((point) => {
            const index = getters.layoutElementIndex(
                point.x,
                point.y,
            );
            commit('updateObstacleStageOfElement', {
                index,
                isObstacle,
            });
        });
    },
    updateLayoutElementBounds: ({ commit }, { index, width, height }) => {
        commit('updateLayoutElementBounds', { index, width, height });
    },
    updateLayoutElementPosition: ({ commit }, { index, row, column }) => {
        commit('updateLayoutElementPosition', { index, row, column });
    },
    initializeDraggedElementCollision: ({ commit }, payload) => commit('initializeDraggedElementCollision', payload),
    setTemplateDesignerSectionTitle: ({ commit, getters }, { row, column, title }) => {
        const index = getters.layoutElementIndex(
            column,
            row,
        );

        commit('setTemplateDesignerSectionTitle', {
            index,
            title,
        });
    },
    setTemplateDesignerTitle: ({ commit }, { title }) => commit('setTemplateDesignerTitle', { title }),
    setTemplateDesignerImage: ({ commit }, { image }) => commit('setTemplateDesignerImage', { image }),
    insertElementToLayout: ({ commit }, payload) => commit('insertElementToLayout', payload),
    setElementRequirement: ({ commit, state }, { id, required }) => {
        const elementIndex = state.templateLayout.findIndex(
            element => element.data && element.data.id === id,
        );

        commit('setElementRequirement', {
            required,
            index: elementIndex,
        });
    },
    setTemplateDesignerLayout: ({ commit }, payload) => commit('setTemplateDesignerLayout', payload),
    clearStorage: ({ commit }) => commit('clearStorage'),
};
