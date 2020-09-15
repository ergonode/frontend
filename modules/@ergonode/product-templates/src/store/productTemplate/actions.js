/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL_ID,
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import {
    getAll as getAllAttributes,
} from '@Attributes/services/attribute/index';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    getMappedLayoutElement,
    getMappedLayoutElements,
    getMappedLayoutElementsForAPIUpdate,
} from '@Templates/models/templateMapper';
import {
    create,
    get,
    getAll,
    getTypes,
    remove,
    update,
} from '@Templates/services/index';

import {
    types,
} from './mutations';

export default {
    async getTemplate(
        {
            commit,
            dispatch,
            rootState,
        },
        {
            id,
        },
    ) {
        const {
            user: {
                language: languageCode,
            },
        } = rootState.authentication;

        const [
            template,
            templateTypes,
            attributes,
        ] = await Promise.all([
            get({
                $axios: this.app.$axios,
                id,
            }),
            getTypes({
                $axios: this.app.$axios,
            }),
            getAllAttributes({
                $axios: this.app.$axios,
            }),
        ]);

        const {
            name,
            image_id: imageID,
            default_label: defaultLabel,
            default_image: defaultImage,
            elements,
        } = template;

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
            key: 'id',
            value: id,
        });
        commit('__SET_STATE', {
            key: 'image',
            value: imageID,
        });

        const elementDescriptions = attributes.collection
            .reduce((prev, curr) => {
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
    },
    async updateProductTemplate(
        {
            state,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                title,
                image,
                defaultTextAttribute,
                defaultImageAttribute,
                layoutElements,
            } = state;

            const data = {
                name: title,
                image,
                defaultLabel: defaultTextAttribute !== SKU_MODEL_ID
                    ? defaultTextAttribute
                    : null,
                defaultImage: defaultImageAttribute,
                elements: getMappedLayoutElementsForAPIUpdate(layoutElements),
            };

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async addListElementToLayout({
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

        const {
            collection,
        } = await getAllAttributes({
            $axios: this.app.$axios,
            params,
        });

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
    },
    getTemplateOptions() {
        return getAll({
            $axios: this.app.$axios,
        }).then(({
            collection,
        }) => ({
            options: collection.map(({
                id, name,
            }) => ({
                id,
                key: '',
                value: name,
                hint: '',
            })),
        }));
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
    async createTemplate(
        {
            state,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
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

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }
    },
    async removeTemplate(
        {
            state,
        },
        {
            onSuccess,
            onError = () => {},
        },
    ) {
        const {
            id,
        } = state;

        try {
            await remove({
                $axios: this.app.$axios,
                id,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
};
