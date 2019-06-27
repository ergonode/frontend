/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { generateProductLayout } from '~/model/template_designer/layout/LayoutGenerator';
import {
    getMappedCategoryValues, getMappedTemplateName,
} from '~/model/mappers/categoryMapper';

export default {
    setProductSku: ({ commit }, payload) => commit('setProductSku', payload),
    setProductTemplate: ({ commit }, payload) => commit('setProductTemplate', payload),
    setProductCategories: ({ commit }, payload) => commit('setProductCategories', payload),
    async setDraftLanguageCode({ commit, state }, { languageCode }) {
        const { id } = state;
        commit('setDraftLanguageCode', languageCode);

        await this.app.$axios.$get(`${languageCode}/drafts/${id}/template`).then(({ elements }) => {
            const templateLayout = generateProductLayout(elements);

            commit('setTemplateLayout', { templateLayout });
        }).catch(e => console.log(e));

        await this.app.$axios.$get(`${languageCode}/drafts/${id}/completeness`).then((completeness) => {
            commit('setProductCompleteness', completeness);
        }).catch(e => console.log(e));
    },
    getProductDraft({ commit, state }, { languageCode, id, onError }) {
        commit('setDraftLanguageCode', languageCode);

        return this.app.$axios.$get(`${languageCode}/drafts/product/${id}`).then(({
            template_id: templateId,
            draft_id: draftId,
            category_ids: categoryIds,
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

            commit('setProductId', { id: draftId });
            commit('setProductSku', { sku });
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
        return this.app.$axios.$get(`${languageCode}/drafts/${id}/completeness`).then((completeness) => {
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
        const index = state.templateLayout.findIndex(
            element => element.attributeId === attributeId,
        );
        await this.app.$axios.$put(`${languageCode}/drafts/${id}/${attributeId}/value`, { value }).then(() => {
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
            commit('setProductId', { id });
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
