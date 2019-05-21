/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setProductId: (state, { id }) => {
        state.id = id;
    },
    setProductSku: (state, { sku }) => {
        state.sku = sku;
    },
    setProductTemplate: (state, { template }) => {
        state.template = template;
    },
    setProductCategories: (state, { selectedCategories }) => {
        state.selectedCategories = selectedCategories;
    },
    clearStorage: (state) => {
        state.id = null;
        state.sku = '';
        state.template = '';
        state.selectedCategories = [];
        state.languageCode = '';
        state.templateLayout = [];
        state.completeness = {};
        state.templates = [];
        state.categories = [];
    },
    setDraftLanguageCode: (state, { languageCode }) => {
        state.languageCode = languageCode;
    },
    setTemplates: (state, { templates }) => {
        state.templates = templates;
    },
    setCategories: (state, { categories }) => {
        state.categories = categories;
    },
    setProductCompleteness: (state, { completeness }) => {
        state.completeness = { ...completeness };
    },
    setTemplateLayout: (state, { templateLayout }) => {
        state.templateLayout = templateLayout;
    },
    setProductTemplateElementValue: (state, { index, value }) => {
        state.templateLayout[index].value = value;
    },
    setProductsValueForKey: (state, { key, value }) => {
        state.product[key] = value;
    },
};
