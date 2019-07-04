/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedCategoryValues, getMappedTemplateName,
} from '~/model/mappers/categoryMapper';
import {
    getMappedLayoutElements,
} from '~/model/mappers/productMapper';

export default {
    setProductSku: ({ commit }, sku) => commit('setProductSku', sku),
    setProductTemplate: ({ commit }, template) => commit('setProductTemplate', template),
    setProductCategories: ({ commit }, categories = []) => commit('setProductCategories', categories),
    async setDraftLanguageCode({ commit, state, dispatch }, languageCode) {
        const { id } = state;
        commit('setDraftLanguageCode', languageCode);

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
        commit('setDraftLanguageCode', languageCode);

        return this.app.$axios.$get(`${languageCode}/products/${id}/draft`).then((draft) => {
            commit('setProductDraft', draft);
        }).catch(e => onError(e.data));
    },
    getProduct({ commit, state }, { languageCode, id, onError }) {
        commit('setDraftLanguageCode', languageCode);

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
                commit('setProductCategories', selectedCategories);
            }

            if (templateId) {
                const template = getMappedTemplateName(templates, templateId);
                commit('setProductTemplate', template);
            }

            commit('setProductId', id);
            commit('setProductSku', sku);
        }).catch(e => onError(e.data));
    },
    getProductTemplate({ commit }, { languageCode, id, onError }) {
        commit('setDraftLanguageCode', languageCode);

        return this.app.$axios.$get(`${languageCode}/products/${id}/template`).then(({ elements }) => {
            commit('setLayoutElements', getMappedLayoutElements(elements));
        }).catch(e => onError(e.data));
    },
    getTemplates({ commit, rootState }, onError) {
        const { authentication: { user: { language } } } = rootState;
        return this.app.$axios.$get(`${language}/templates?limit=5000&offset=0`).then(({ collection: templates }) => {
            commit('setTemplates', templates);
        }).catch(e => onError(e.data));
    },
    getCategories({ commit, rootState }, onError) {
        const { authentication: { user: { language } } } = rootState;
        return this.app.$axios.$get(`${language}/categories?limit=5000&offset=0`).then(({ collection: categories }) => {
            commit('setCategories', categories);
        }).catch(e => onError(e.data));
    },
    getProductCompleteness({ commit }, {
        id,
        languageCode,
        onError,
    }) {
        return this.app.$axios.$get(`${languageCode}/products/${id}/draft/completeness`).then((completeness) => {
            commit('setProductCompleteness', completeness);
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
            element => element.attributeId === attributeId,
        );

        await this.app.$axios.$put(`${languageCode}/products/${id}/draft/${attributeId}/value`, { value }).then(() => {
            commit('setProductTemplateElementValue', { index, value });
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
        commit('clearStorage');
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
            commit('setProductId', id);
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
        return this.app.$axios.$put(`${language}/drafts/${id}/persist`, {}).then(() => onSuccess()).catch(e => onError(e.data));
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
