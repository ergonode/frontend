/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import {
    getMappedCategoryValues, getMappedTemplateName,
} from '~/model/mappers/categoryMapper';
import {
    getMappedLayoutElements,
} from '~/model/mappers/productMapper';

export default {
    setProductSku: ({ commit }, sku) => commit(types.SET_PRODUCT_SKU, sku),
    setProductTemplate: ({ commit }, template) => commit(types.SET_PRODUCT_TEMPLATE, template),
    setProductCategories: ({ commit }, categories = []) => {
        commit(types.SET_PRODUCT_CATEGORIES, categories);
    },
    async setDraftLanguageCode({ commit, state, dispatch }, languageCode) {
        const { id } = state;
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        const data = { id, languageCode, onError: err => console.log(err) };

        const productTemplateRequest = dispatch('getProductTemplate', data);
        const completenessRequest = dispatch('getProductCompleteness', data);
        const productDraftRequest = dispatch('getProductDraft', data);

        await Promise.all([
            completenessRequest,
            productTemplateRequest,
            productDraftRequest,
        ]);
    },
    getProductDraft({ commit }, { languageCode, id, onError }) {
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        return this.app.$axios.$get(`${languageCode}/products/${id}/draft`).then((draft) => {
            commit(types.SET_PRODUCT_DRAFT, draft);
        }).catch(e => onError(e.data));
    },
    getProduct({ commit, state }, { languageCode, id, onError }) {
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        return this.app.$axios.$get(`${languageCode}/products/${id}`).then(({
            design_template_id: templateId,
            categories: categoryIds,
            sku,
        }) => {
            const { categories, templates } = state;

            if (categoryIds) {
                const selectedCategories = getMappedCategoryValues(
                    categories,
                    categoryIds,
                );
                commit(types.SET_PRODUCT_CATEGORIES, selectedCategories);
            }

            if (templateId) {
                const template = getMappedTemplateName(templates, templateId);
                commit(types.SET_PRODUCT_TEMPLATE, template);
            }

            commit(types.SET_PRODUCT_ID, id);
            commit(types.SET_PRODUCT_SKU, sku);
        }).catch(e => onError(e));
    },
    getProductTemplate({ commit }, { languageCode, id, onError }) {
        commit(types.SET_DRAFT_LANGUAGE_CODE, languageCode);

        return this.app.$axios.$get(`${languageCode}/products/${id}/template`).then(({ elements }) => {
            commit(types.SET_LAYOUT_ELEMENTS, getMappedLayoutElements(elements));
        }).catch(e => onError(e.data));
    },
    getTemplates({ commit, rootState }, onError) {
        const { authentication: { user: { language } } } = rootState;
        return this.app.$axios.$get(`${language}/templates?limit=5000&offset=0`).then(({ collection: templates }) => {
            commit(types.SET_TEMPLATES, templates);
        }).catch(e => onError(e.data));
    },
    getCategories({ commit, rootState }, onError) {
        const { authentication: { user: { language } } } = rootState;
        return this.app.$axios.$get(`${language}/categories?limit=5000&offset=0`).then(({ collection: categories }) => {
            commit(types.SET_CATEGORIES, categories);
        }).catch(e => onError(e.data));
    },
    getProductCompleteness({ commit }, {
        id,
        languageCode,
        onError,
    }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft/completeness`).then((completeness) => {
            commit(types.SET_PRODUCT_COMPLETENESS, completeness);
        }).catch(e => onError(e.data));
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
            element => element.id === attributeId,
        );

        await this.app.$axios.$put(`${languageCode}/products/${id}/draft/${attributeId}/value`, { value }).then(() => {
            commit(types.SET_PRODUCT_TEMPLATE_ELEMENT_VALUE, { index, value });
            // Update completeness only for required elements
            if (required) {
                dispatch('getProductCompleteness', {
                    id,
                    languageCode,
                    onError: () => {},
                });
            }
            onSuccess(name);
        }).catch(e => onError({ errors: e.data.errors, name }));
    },
    clearStorage: ({ commit }) => {
        commit(types.CLEAR_STATE);
    },
    createProduct(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { authentication: { user: { language } } } = rootState;
        return this.app.$axios.$post(`${language}/products`, data).then(({ id }) => {
            commit(types.SET_PRODUCT_ID, id);
            onSuccess(id);
        }).catch(e => onError(e.data));
    },
    applyDraft(
        { rootState },
        {
            id,
            onSuccess,
            onError,
        },
    ) {
        const { authentication: { user: { language } } } = rootState;
        return this.app.$axios.$put(`${language}/products/${id}/draft/persist`, {}).then(() => onSuccess()).catch(e => onError(e.data));
    },
    updateProduct(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { authentication: { user: { language } } } = rootState;
        return this.app.$axios.$put(`${language}/products/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
};
