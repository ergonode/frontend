/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { TYPES } from '@Attributes/defaults/attributes';
import { PRODUCT_TYPE } from '@Products/defaults';

import { types } from './mutations';

const getAttributesByFilter = () => import('@Attributes/services/getAttributesByFilter.service');

export default {
    setProductSku: ({ commit }, sku) => commit(types.SET_PRODUCT_SKU, sku),
    setDraftValue: ({ commit }, payload) => commit(types.SET_DRAFT_VALUE, payload),
    setProductStatus: ({ commit }, status) => commit(types.SET_PRODUCT_STATUS, status),
    setProductTemplate: ({ commit }, template) => commit(types.SET_PRODUCT_TEMPLATE, template),
    setProductType: ({ commit }, type) => commit(types.SET_PRODUCT_TYPE, type),
    setBindingAttributeId: ({ commit }, payload) => commit(types.SET_BINDING_ATTRIBUTE_ID, payload),
    addBindingAttribute: ({ commit }) => commit(types.ADD_BINDING_ATTRIBUTE),
    removeBindingAttribute: ({ commit }, index) => commit(types.REMOVE_BINDING_ATTRIBUTE, index),
    setProductCategories: (
        { commit },
        categories = [],
    ) => commit(types.SET_PRODUCT_CATEGORIES, categories),
    getProductDraft({ commit }, { languageCode, id }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft`).then(({ attributes }) => {
            commit(types.SET_PRODUCT_DRAFT, { languageCode, draft: attributes });
        });
    },
    getProductById({ commit, dispatch, rootState }, id) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { productTypes } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/products/${id}`).then(({
            design_template_id: templateId,
            categories: categoryIds,
            attributes,
            sku,
            type,
            status,
            workflow = [],
        }) => {
            if (categoryIds) {
                commit(types.SET_PRODUCT_CATEGORIES, categoryIds);
            }

            if (templateId) {
                commit(types.SET_PRODUCT_TEMPLATE, templateId);
            }

            commit(types.SET_PRODUCT_ID, id);
            commit(types.SET_PRODUCT_SKU, sku);
            commit(types.SET_PRODUCT_STATUS, status);
            commit(types.SET_PRODUCT_WORKFLOW, workflow);
            commit(types.SET_PRODUCT_DATA, attributes);
            commit(types.SET_PRODUCT_TYPE, productTypes[type]);

            if (type === PRODUCT_TYPE.WITH_VARIANTS) {
                const getAttributesBindings = this.app.$axios.$get(`${userLanguageCode}/products/${id}/bindings`).then((bindings) => {
                    commit(types.SET_BINDING_ATTRIBUTE_IDS, bindings);
                });

                return Promise.all([
                    getAttributesBindings,
                    dispatch('getSelectAttributes'),
                ]);
            }

            return true;
        });
    },
    updateProductStatus({ state, rootState, dispatch }, {
        attributeId,
        value,
        onSuccess,
    }) {
        const { id } = state;
        const { authentication: { user: { language } } } = rootState;

        return this.app.$axios.$put(`${language}/products/${id}/draft/${attributeId}/value`, { value }).then(() => {
            dispatch('applyDraft', {
                id,
                onSuccess,
            });
        });
    },
    getSelectAttributes({ commit }) {
        return getAttributesByFilter().then(
            response => response.default({
                $axios: this.app.$axios,
                $store: this,
                filter: `type=${TYPES.SELECT}`,
            }).then((selectAttributes) => {
                commit(types.SET_SELECT_ATTRIBUTES, selectAttributes);
            }),
        );
    },
    async applyDraft(
        { rootState },
        {
            id,
            onSuccess,
        },
    ) {
        const { authentication: { user: { language } } } = rootState;

        await this.$setLoader('footerDraftButton');
        await this.app.$axios.$put(`${language}/products/${id}/draft/persist`, {}).then(() => onSuccess());
        await this.$removeLoader('footerDraftButton');
    },
    async updateProduct(
        { rootState, dispatch },
        {
            id,
            data,
            onSuccess = () => {},
        },
    ) {
        const { authentication: { user: { language } } } = rootState;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${language}/products/${id}`, data).then(onSuccess).catch(e => dispatch('validations/onError', e.data, { root: true }));
        await this.$removeLoader('footerButton');
    },
    removeProduct({ state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/products/${id}`).then(() => onSuccess());
    },
    clearStorage: ({ commit }) => {
        commit(types.CLEAR_STATE);
    },
};
