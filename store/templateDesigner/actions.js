/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { generateLayout } from '~/model/template_designer/layout/LayoutGenerator';
import { getObstaclePointsForBaseCoordinates } from '~/model/template_designer/layout/LayoutProvider';

export default {
    getTemplateByID(
        { commit, getters },
        { path, onError },
    ) {
        return this.app.$axios.$get(path).then(({
            name,
            image_id: imageID,
            sections,
            elements,
        }) => {
            const numberOfColumns = 4;
            const numberOfItems = 100;
            const templateLayout = generateLayout(numberOfColumns, numberOfItems, 'TemplateGridItem', elements, sections);
            commit('setTemplateDesignerTitle', { title: name });
            commit('setTemplateDesignerImage', { image: imageID });
            commit('setTemplateDesignerLayout', templateLayout);

            const obstaclesBaseCoordinates = templateLayout.filter(
                e => e.component === 'AttributeElement',
            ).map(
                e => e.coordinates,
            );
            obstaclesBaseCoordinates.forEach((coordinates) => {
                const points = getObstaclePointsForBaseCoordinates(
                    coordinates,
                );

                points.forEach((point) => {
                    const index = getters.layoutElementIndex(
                        point.x,
                        point.y,
                    );
                    commit('updateObstacleStageOfElement', {
                        index,
                        isObstacle: true,
                    });
                });
            });
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
    initializeDraggedElementCollision: ({ commit }, payload) => commit('initializeDraggedElementCollision', payload),
    initializeHighlightingHintPoints: ({ commit }, payload) => commit('initializeHighlightingHintPoints', payload),
    initializeHighlightingHoverPoints: ({ commit, state }, payload) => {
        if (payload && state.highlightingHoverPoints.length !== payload.length) {
            commit('initializeHighlightingHoverPoints', payload);
        }

        if (!payload) {
            commit('initializeHighlightingHoverPoints');
        }
    },
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
