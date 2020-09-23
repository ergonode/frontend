/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
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

        // EXTENDED BEFORE METHOD
        await this.$extendMethods('@Templates/store/productTemplate/action/getTemplate/__before', {
            $this: this,
            data: {
                id,
            },
        });
        // EXTENDED BEFORE METHOD

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
            elements,
        } = template;

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

        // EXTENDED AFTER METHOD
        await this.$extendMethods('@Templates/store/productTemplate/action/getTemplate/__after', {
            $this: this,
            data: template,
        });
        // EXTENDED AFTER METHOD
    },
    async updateTemplate(
        {
            state,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                title,
                image,
                layoutElements,
            } = state;
            let data = {
                name: title,
                image,
                elements: getMappedLayoutElementsForAPIUpdate(layoutElements),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Templates/store/productTemplate/action/updateTemplate/__before', {
                $this: this,
                data,
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Templates/store/productTemplate/action/updateTemplate/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
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
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                title,
                image,
            } = state;
            let data = {
                name: title,
                image,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Templates/store/productTemplate/action/createTemplate/__before', {
                $this: this,
                data,
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Templates/store/productTemplate/action/createTemplate/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeTemplate(
        {
            state,
        },
        {
            scope,
            onSuccess,
            onError = () => {},
        },
    ) {
        const {
            id,
        } = state;

        try {
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Templates/store/productTemplate/action/removeTemplate/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Templates/store/productTemplate/action/removeTemplate/__after', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD
            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
};
