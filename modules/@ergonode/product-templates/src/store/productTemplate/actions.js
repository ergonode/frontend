/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SYSTEM_TYPES,
} from '@Attributes/defaults';
import {
    get as getAttribute,
    getAutocomplete as getAttributesAutocomplete,
} from '@Attributes/services';
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
import {
    create,
    get,
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
        },
        {
            id,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Templates/store/productTemplate/action/getTemplate/__before', {
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
                getAttributesAutocomplete({
                    $axios: this.app.$axios,
                }),
            ]);

            const {
                name,
                code,
                elements = [],
            } = template;

            dispatch('__clearStorage');

            commit('__SET_STATE', {
                key: 'types',
                value: templateTypes.collection,
            });
            commit('__SET_STATE', {
                key: 'title',
                value: name,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });

            const elementDescriptions = attributes.reduce((prev, curr) => ({
                ...prev,
                [curr.id]: curr.label || curr.code,
            }), {});

            const layoutElements = getMappedLayoutElements(
                elements,
                elementDescriptions,
                templateTypes.collection,
            );

            commit('__SET_STATE', {
                key: 'layoutElements',
                value: layoutElements,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Templates/store/productTemplate/action/getTemplate/__after', {
                $this: this,
                data: template,
            });
            // EXTENDED AFTER METHOD
            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
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
                code,
                layoutElements,
            } = state;
            let data = {
                name: title,
                code,
                elements: getMappedLayoutElementsForAPIUpdate(layoutElements),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Templates/store/productTemplate/action/updateTemplate/__before', {
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
            await this.$getExtendMethod('@Templates/store/productTemplate/action/updateTemplate/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Templates.productTemplate.store.action.updateCancel'),
                });

                return;
            }
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async addListElementToLayout({
        commit,
        dispatch,
        state,
    }, {
        draggableId,
        position,
        scope,
    }) {
        const [
            id,
            value,
        ] = draggableId.split('/');
        const [
            code,
            languageCode,
        ] = value.split(':');
        const attribute = await getAttribute({
            $axios: this.app.$axios,
            id,
        });

        const layoutElement = getMappedLayoutElement({
            id: attribute.id,
            bounds: state.types.find(attributeType => attributeType.type === attribute.type),
            label: attribute.label[languageCode] || code,
            position,
        });

        dispatch('list/setDisabledScopeElement', {
            disabledElement: {
                languageCode,
                elementId: attribute.id,
                disabled: true,
            },
            scope,
        }, {
            root: true,
        });
        commit(types.ADD_ELEMENT_TO_LAYOUT, layoutElement);
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
        commit,
        dispatch,
        state,
        rootState,
    }, {
        index,
        scope,
    }) => {
        const {
            layoutElements,
        } = state;
        const {
            user,
        } = rootState.authentication;
        dispatch('list/removeDisabledScopeElement', {
            languageCode: user.language,
            elementId: layoutElements[index].id,
            scope,
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
                code,
            } = state;
            let data = {
                name: title,
                code,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Templates/store/productTemplate/action/createTemplate/__before', {
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
            await this.$getExtendMethod('@Templates/store/productTemplate/action/createTemplate/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Templates.productTemplate.store.action.createCancel'),
                });

                return;
            }

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
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        const {
            id,
        } = state;

        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Templates/store/productTemplate/action/removeTemplate/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Templates/store/productTemplate/action/removeTemplate/__after', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD
            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Templates.productTemplate.store.action.deleteCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
};
