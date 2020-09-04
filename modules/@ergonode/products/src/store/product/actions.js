/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    EXTENDS,
    PRODUCT_TYPE,
} from '@Products/defaults';

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
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft`, {
            withLanguage: false,
        }).then(({
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
            productTypes,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`products/${id}`).then((data) => {
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
                const getAttributesBindings = this.app.$axios.$get(`products/${id}/bindings`).then((bindings) => {
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
        state,
    }, {
        attributeId,
        value,
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return this.app.$axios.$put(`products/${id}/draft/${attributeId}/value`, {
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
            dispatch,
        },
        {
            id,
            data,
            onSuccess = () => {},
        },
    ) {
        await this.app.$axios.$put(`products/${id}`, data).then(onSuccess).catch(e => dispatch('validations/onError', e.data, {
            root: true,
        }));
    },
    removeProduct({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return this.app.$axios.$delete(`products/${id}`).then(() => onSuccess());
    },
};
