/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import {
    getMappedLayoutElements,
} from '~/model/mappers/productMapper';

export default {
    setProductSku: ({ commit }, sku) => commit(types.SET_PRODUCT_SKU, sku),
    setProductStatus: ({ commit }, status) => commit(types.SET_PRODUCT_STATUS, status),
    setProductTemplate: ({ commit }, template) => commit(types.SET_PRODUCT_TEMPLATE, template),
    setProductCategories: ({ commit }, categories = []) => {
        commit(types.SET_PRODUCT_CATEGORIES, categories);
    },
    async getDraftForLanguage({ commit, dispatch }, data) {
        const productTemplateRequest = dispatch('getProductTemplate', data);
        const completenessRequest = dispatch('getProductCompleteness', data);
        const productDraftRequest = dispatch('getProductDraft', data);

        await Promise.all([
            completenessRequest,
            productTemplateRequest,
            productDraftRequest,
        ]);
    },
    getProductDraft({ commit }, { languageCode, id }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft`).then((draft) => {
            commit(types.SET_PRODUCT_DRAFT, draft);
        });
    },
    getProduct({ commit, state }, { languageCode, id }) {
        const { categories, templates } = state;
        const parseCategories = (category) => {
            const {
                id: categoryId, name, code,
            } = categories.find((c) => c.code === category);

            return {
                id: categoryId,
                key: code,
                value: name,
                hint: name ? `#${code} ${this.userLanguageCode}` : '',
            };
        };
        const parseTemplate = (templateId) => {
            const { name } = templates.find((t) => t.id === templateId);

            return {
                id: templateId, key: '', value: name, hint: '',
            };
        };

        return this.app.$axios.$get(`${languageCode}/products/${id}`).then(({
            design_template_id: templateId,
            categories: categoryCodes,
            sku,
            status,
            workflow = [],
        }) => {
            if (categoryCodes) {
                commit(types.SET_PRODUCT_CATEGORIES, categoryCodes.map(parseCategories));
            }

            if (templateId) {
                commit(types.SET_PRODUCT_TEMPLATE, parseTemplate(templateId));
            }

            commit(types.SET_PRODUCT_ID, id);
            commit(types.SET_PRODUCT_SKU, sku);
            commit(types.SET_PRODUCT_STATUS, status);
            commit(types.SET_PRODUCT_WORKFLOW, workflow);
        });
    },
    getProductTemplate({ commit }, { languageCode, id }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/template`).then(({ elements }) => {
            commit(types.SET_LAYOUT_ELEMENTS, getMappedLayoutElements(elements));
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
    getProductCompleteness({ commit }, {
        id,
        languageCode,
    }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft/completeness`).then((completeness) => {
            commit(types.SET_PRODUCT_COMPLETENESS, completeness);
        });
    },
    async setProductTemplateElementValue({ commit, state, dispatch }, {
        attributeId,
        value,
        required,
        name,
        languageCode,
        onSuccess,
        onError,
    }) {
        const {
            id,
        } = state;
        const index = state.layoutElements.findIndex(
            (element) => element.id === attributeId,
        );

        await this.app.$axios.$put(`${languageCode}/products/${id}/draft/${attributeId}/value`, { value }).then(() => {
            commit(types.SET_PRODUCT_TEMPLATE_ELEMENT_VALUE, { index, value });
            // Update completeness only for required elements
            if (required) {
                dispatch('getProductCompleteness', {
                    id,
                    languageCode,
                });
            }
            onSuccess(name);
        }).catch((e) => onError({ errors: e.data.errors, name }));
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
    async createProduct(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { authentication: { user: { language } } } = rootState;

        await this.$setLoader('footerButton');
        await this.app.$axios.$post(`${language}/products`, data).then(({ id }) => {
            commit(types.SET_PRODUCT_ID, id);
            onSuccess(id);
        }).catch((e) => onError(e.data));
        await this.$removeLoader('footerButton');
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
