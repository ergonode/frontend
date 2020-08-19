/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL_ID,
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    getMappedLayoutElement,
    getMappedLayoutElements,
    getMappedLayoutElementsForAPIUpdate,
} from '@Templates/models/templateMapper';
import productTemplateService from '@Templates/services/index';

import {
    types,
} from './mutations';

export default {
    async createProductTemplate(
        {
            state,
            rootState,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        const {
            title,
            image,
            defaultTextAttribute,
            defaultImageAttribute,
        } = state;

        const data = {
            name: title,
            image,
            defaultLabel: defaultTextAttribute !== SKU_MODEL_ID
                ? defaultTextAttribute
                : null,
            defaultImage: defaultImageAttribute,
        };

        const id = await productTemplateService.create({
            $axios: this.app.$axios,
            languageCode: userLanguageCode,
            data,
        });

        this.app.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'Product template created',
        });

        return id;
    },
    getTemplate(
        {
            commit,
            dispatch,
            rootState,
        },
        id,
    ) {
        const {
            user: {
                language: languageCode,
            },
        } = rootState.authentication;

        return Promise.all([
            this.app.$axios.$get(`${languageCode}/templates/${id}`),
            this.app.$axios.$get(`${languageCode}/templates/types`, {
                params: {
                    view: 'list',
                },
            }),
        ]).then(([
            template,
            templateTypes,
        ]) => {
            const {
                name,
                image_id: imageID,
                default_label: defaultLabel,
                default_image: defaultImage,
                elements,
            } = template;

            // TODO: BE has no filter via ID's - we gonna wait for them
            // const attributesId = elements.map(el => el.properties.attribute_id);
            const params = {
                // filter: `id=${attributesId.join(',')}`,
                view: 'list',
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'defaultTextAttribute',
                value: defaultLabel || SKU_MODEL_ID,
            });
            commit('__SET_STATE', {
                key: 'defaultImageAttribute',
                value: defaultImage,
            });
            commit('__SET_STATE', {
                key: 'types',
                value: templateTypes.collection,
            });
            commit('__SET_STATE', {
                key: 'title',
                value: name,
            });
            commit('__SET_STATE', {
                key: 'image',
                value: imageID,
            });

            return this.app.$axios.$get(`${languageCode}/attributes`, {
                params,
            }).then(({
                collection,
            }) => {
                const elementDescriptions = collection.reduce((prev, curr) => {
                    const tmp = prev;

                    tmp[curr.id] = curr.label || curr.code;

                    return tmp;
                }, {});

                const layoutElements = getMappedLayoutElements(
                    elements,
                    elementDescriptions,
                    templateTypes.collection,
                );

                for (let i = layoutElements.length - 1; i > -1; i -= 1) {
                    dispatch('list/setDisabledElement', {
                        languageCode,
                        elementId: layoutElements[i].id,
                        disabled: true,
                    }, {
                        root: true,
                    });
                }

                commit('__SET_STATE', {
                    key: 'layoutElements',
                    value: layoutElements,
                });
            });
        });
    },
    async updateProductTemplate(
        {
            state,
            rootState,
        },
    ) {
        const {
            id,
            title,
            image,
            layoutElements,
            defaultTextAttribute,
            defaultImageAttribute,
        } = state;
        const {
            language,
        } = rootState.authentication.user;
        const data = {
            name: title,
            image,
            defaultLabel: defaultTextAttribute !== SKU_MODEL_ID
                ? defaultTextAttribute
                : null,
            defaultImage: defaultImageAttribute,
            elements: getMappedLayoutElementsForAPIUpdate(layoutElements),
        };

        await productTemplateService.update({
            $axios: this.app.$axios,
            id,
            languageCode: language,
            data,
        });
        this.app.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'Product template updated',
        });
    },
    addListElementToLayout({
        commit, dispatch, rootState, state,
    }, position) {
        const {
            draggedElement,
        } = rootState.draggable;
        const [
            value,
            languageCode,
        ] = draggedElement.split(':');
        const params = {
            limit: 1,
            offset: 0,
            filter: `code=${value}`,
            field: 'code',
            view: 'list',
            order: 'ASC',
        };
        this.app.$axios.$get(`${languageCode}/attributes`, {
            params,
        }).then(({
            collection,
        }) => {
            const [
                element,
            ] = collection;

            const layoutElement = getMappedLayoutElement({
                id: element.id,
                bounds: state.types.find(attributeType => attributeType.type === element.type),
                label: element.label || element.code,
                position,
            });

            dispatch('list/setDisabledElement', {
                languageCode,
                elementId: element.id,
                disabled: true,
            }, {
                root: true,
            });
            commit(types.ADD_ELEMENT_TO_LAYOUT, layoutElement);
        });
    },
    addSectionElementToLayout: ({
        commit, state,
    }, {
        row, column, title,
    }) => {
        const layoutElement = getMappedLayoutElement({
            id: getUUID(),
            bounds: state.types.find(attributeType => attributeType.type === SYSTEM_TYPES.SECTION),
            label: title,
            position: {
                row,
                column,
            },
        });

        commit(types.ADD_ELEMENT_TO_LAYOUT, layoutElement);
    },
    updateLayoutElementAtIndex: ({
        commit,
    }, payload) => {
        commit(types.UPDATE_LAYOUT_ELEMENT_AT_INDEX, payload);
    },
    removeLayoutElementAtIndex: ({
        commit, dispatch, state, rootState,
    }, index) => {
        const {
            layoutElements,
        } = state;
        const {
            user,
        } = rootState.authentication;
        dispatch('list/removeDisabledElement', {
            languageCode: user.language,
            elementId: layoutElements[index].id,
        }, {
            root: true,
        });
        commit(types.REMOVE_LAYOUT_ELEMENT_AT_INDEX, index);
    },
    removeTemplate({
        rootState,
    }, {
        id, onSuccess,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/templates/${id}`).then(() => onSuccess());
    },
};
