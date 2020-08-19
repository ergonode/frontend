/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    EXTENDS,
    PRODUCT_TYPE,
} from '@Products/defaults';
import productService from '@Products/services';

import {
    types,
} from './mutations';

const getAttributesByFilter = () => import('@Attributes/services/getAttributesByFilter.service');
const applyProductDraft = () => import('@Products/services/applyProductDraft.service');

export default {
    setDraftValue: ({
        commit,
    }, payload) => commit(types.SET_DRAFT_VALUE, payload),
    setBindingAttributeId: ({
        commit,
    }, payload) => commit(types.SET_BINDING_ATTRIBUTE_ID, payload),
    addBindingAttribute: ({
        commit,
    }) => commit(types.ADD_BINDING_ATTRIBUTE),
    removeBindingAttribute: ({
        commit,
    }, index) => commit(types.REMOVE_BINDING_ATTRIBUTE, index),
    getProductDraft({
        commit,
    }, {
        languageCode, id,
    }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft`).then(({
            attributes,
        }) => {
            commit(types.SET_PRODUCT_DRAFT, {
                languageCode,
                draft: attributes,
            });
        });
    },
    getProduct({
        commit, dispatch, rootState,
    }, id) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            productTypes,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/products/${id}`).then((data) => {
            const {
                design_template_id: templateId,
                attributes,
                sku,
                type,
                status,
                workflow = [],
            } = data;

            if (templateId) {
                commit('__SET_STATE', {
                    key: 'template',
                    value: templateId,
                });
            }

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'sku',
                value: sku,
            });
            commit('__SET_STATE', {
                key: 'type',
                value: productTypes[type],
            });
            commit('__SET_STATE', {
                key: 'status',
                value: status,
            });
            commit('__SET_STATE', {
                key: 'workflow',
                value: workflow,
            });
            commit('__SET_STATE', {
                key: 'data',
                value: attributes,
            });

            this.$extendMethods(EXTENDS['@Products/store/product/action/getProduct'], {
                data,
                commit,
                dispatch,
            });

            if (type === PRODUCT_TYPE.WITH_VARIANTS) {
                const getAttributesBindings = this.app.$axios.$get(`${userLanguageCode}/products/${id}/bindings`).then((bindings) => {
                    commit('__SET_STATE', {
                        key: 'bindingAttributesIds',
                        value: bindings,
                    });
                });

                return Promise.all([
                    getAttributesBindings,
                    dispatch('getSelectAttributes'),
                ]);
            }

            return true;
        });
    },
    updateProductStatus({
        state, rootState,
    }, {
        attributeId,
        value,
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            authentication: {
                user: {
                    language,
                },
            },
        } = rootState;

        return this.app.$axios.$put(`${language}/products/${id}/draft/${attributeId}/value`, {
            value,
        }).then(() => applyProductDraft()
            .then(request => request
                .default({
                    $axios: this.app.$axios,
                    $store: this,
                    id,
                })
                .then(onSuccess)));
    },
    getSelectAttributes({
        commit,
    }) {
        return getAttributesByFilter().then(
            response => response.default({
                $axios: this.app.$axios,
                $store: this,
                filter: `type=${TYPES.SELECT}`,
            }).then((selectAttributes) => {
                commit('__SET_STATE', {
                    key: 'selectAttributes',
                    value: selectAttributes,
                });
            }),
        );
    },
    async updateProduct(
        {
            state,
            rootState,
        },
    ) {
        const {
            authentication: {
                user: {
                    language,
                },
            },
            dictionaries: {
                productTypes,
            },
        } = rootState;
        const {
            id,
            template,
            categories,
            bindingAttributesIds,
            type,
        } = state;

        const data = {
            templateId: template,
            categoryIds: categories,
        };

        if (getKeyByValue(productTypes, type) === PRODUCT_TYPE.WITH_VARIANTS) {
            data.bindings = bindingAttributesIds;
        }

        await productService.update({
            $axios: this.app.$axios,
            id,
            languageCode: language,
            data,
        });
        this.app.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'Product updated',
        });
    },
    async createProduct(
        {
            state,
            rootState,
        },
    ) {
        const {
            authentication: {
                user: {
                    language,
                },
            },
            dictionaries: {
                productTypes,
            },
        } = rootState;

        const {
            sku,
            type,
            template,
            categories,
            bindingAttributesIds,
        } = state;

        const data = {
            sku,
            type: getKeyByValue(productTypes, type),
            templateId: template,
            categoryIds: categories,
        };

        if (bindingAttributesIds.length) {
            data.bindings = bindingAttributesIds;
        }

        const id = await productService.create({
            $axios: this.app.$axios,
            languageCode: language,
            data,
        });

        this.app.$addAlert({
            type: ALERT_TYPE.SUCCESS,
            message: 'Product created',
        });

        return id;
    },
    removeProduct({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/products/${id}`).then(() => onSuccess());
    },
};
