/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

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
    getProductById({ commit, state, rootState }, id) {
        const { categories, templates } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        const { productTypes } = rootState.dictionaries;
        const parseCategories = (category) => {
            const {
                id: categoryId, name, code,
            } = categories.find(c => c.id === category);

            return {
                id: categoryId,
                key: code,
                value: name,
                hint: name ? `#${code} ${userLanguageCode}` : '',
            };
        };
        const parseTemplate = (templateId) => {
            const { name } = templates.find(t => t.id === templateId);

            return {
                id: templateId, key: '', value: name, hint: '',
            };
        };

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
                commit(types.SET_PRODUCT_CATEGORIES, categoryIds.map(parseCategories));
            }

            if (templateId) {
                commit(types.SET_PRODUCT_TEMPLATE, parseTemplate(templateId));
            }

            // TODO:
            // - Set attribute bindings

            commit(types.SET_PRODUCT_ID, id);
            commit(types.SET_PRODUCT_SKU, sku);
            commit(types.SET_PRODUCT_STATUS, status);
            commit(types.SET_PRODUCT_WORKFLOW, workflow);
            commit(types.SET_PRODUCT_DATA, attributes);
            commit(types.SET_PRODUCT_TYPE, productTypes[type]);
            commit(types.SET_BINDING_ATTRIBUTE_IDS, []);
            commit(types.SET_INITIAL_BINDING_ATTRIBUTE_IDS, []);
        });
    },
    getTemplates({ commit, rootState }) {
        const { authentication: { user: { language } } } = rootState;

        return this.app.$axios.$get(`${language}/templates?limit=5000&offset=0`).then(({ collection: templates }) => {
            commit(types.SET_TEMPLATES, templates);
        });
    },
    getCategories({ commit, rootState }) {
        const { authentication: { user: { language } } } = rootState;

        return this.app.$axios.$get(`${language}/categories?limit=5000&offset=0`).then(({ collection: categories }) => {
            commit(types.SET_CATEGORIES, categories);
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
        { rootState },
        {
            id,
            data,
            onSuccess = () => {},
        },
    ) {
        const { authentication: { user: { language } } } = rootState;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${language}/products/${id}`, data).then(onSuccess);
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
