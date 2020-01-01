/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import {
    getMappedLayoutElements,
} from '@Products/models/productMapper';

const onDefaultError = () => {};

export default {
    setProductSku: ({ commit }, sku) => commit(types.SET_PRODUCT_SKU, sku),
    setProductStatus: ({ commit }, status) => commit(types.SET_PRODUCT_STATUS, status),
    setProductTemplate: ({ commit }, template) => commit(types.SET_PRODUCT_TEMPLATE, template),
    setProductCategories: ({ commit }, categories = []) => {
        commit(types.SET_PRODUCT_CATEGORIES, categories);
    },
    async setDraftLanguageCode({ commit, state, dispatch }, languageCode) {
        const { id } = state;
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        const data = { id, languageCode };
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
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        return this.app.$axios.$get(`${languageCode}/products/${id}/draft`).then((draft) => {
            commit(types.SET_PRODUCT_DRAFT, draft);
        }).catch(onDefaultError);
    },
    getProduct({ commit, state }, { languageCode, id }) {
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        const { categories } = state;
        const parseCategoryIds = (category) => categories.find((c) => c.code === category).id;

        return this.app.$axios.$get(`${languageCode}/products/${id}`).then(({
            design_template_id: templateId,
            categories: categoryIds,
            sku,
            status,
            workflow = [],
        }) => {
            if (categoryIds) {
                commit(types.SET_PRODUCT_CATEGORIES, categoryIds.map(parseCategoryIds));
            }

            if (templateId) {
                commit(types.SET_PRODUCT_TEMPLATE, templateId);
            }

            commit(types.SET_PRODUCT_ID, id);
            commit(types.SET_PRODUCT_SKU, sku);
            commit(types.SET_PRODUCT_STATUS, status);
            commit(types.SET_PRODUCT_WORKFLOW, workflow);
        }).catch(onDefaultError);
    },
    getProductTemplate({ commit }, { languageCode, id }) {
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        return this.app.$axios.$get(`${languageCode}/products/${id}/template`).then(({ elements }) => {
            commit(types.SET_LAYOUT_ELEMENTS, getMappedLayoutElements(elements));
        }).catch(onDefaultError);
    },
    getTemplates({ commit, rootState }) {
        const { authentication: { user: { language } } } = rootState;

        return this.app.$axios.$get(`${language}/templates?limit=5000&offset=0`).then(({ collection: templates }) => {
            commit(types.SET_TEMPLATES, templates);
        }).catch(onDefaultError);
    },
    getCategories({ commit, rootState }) {
        const { authentication: { user: { language } } } = rootState;

        return this.app.$axios.$get(`${language}/categories?limit=5000&offset=0`).then(({ collection: categories }) => {
            commit(types.SET_CATEGORIES, categories);
        }).catch(onDefaultError);
    },
    getProductCompleteness({ commit }, {
        id,
        languageCode,
    }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft/completeness`).then((completeness) => {
            commit(types.SET_PRODUCT_COMPLETENESS, completeness);
        }).catch(onDefaultError);
    },
    async setProductTemplateElementValue({ commit, state, dispatch }, {
        attributeId,
        value,
        required,
        name,
        onSuccess,
        onError,
    }) {
        const {
            id,
            languageCode,
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
        }).catch(onDefaultError);
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
        await this.app.$axios.$put(`${language}/products/${id}/draft/persist`, {}).then(() => onSuccess()).catch(onDefaultError);
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
        await this.app.$axios.$put(`${language}/products/${id}`, data).then(onSuccess).catch(onDefaultError);
        await this.$removeLoader('footerButton');
    },
    removeProduct({ state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/products/${id}`).then(() => onSuccess()).catch(onDefaultError);
    },
    clearStorage: ({ commit }) => {
        commit(types.CLEAR_STATE);
    },
};
