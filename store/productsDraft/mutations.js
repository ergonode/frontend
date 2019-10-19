/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_PRODUCT_ID: 'SET_PRODUCT_ID',
    SET_PRODUCT_SKU: 'SET_PRODUCT_SKU',
    SET_PRODUCT_STATUS: 'SET_PRODUCT_STATUS',
    SET_PRODUCT_WORKFLOW: 'SET_PRODUCT_WORKFLOW',
    SET_PRODUCT_TEMPLATE: 'SET_PRODUCT_TEMPLATE',
    SET_PRODUCT_CATEGORIES: 'SET_PRODUCT_CATEGORIES',
    SET_DRAFT_LANGUAGE_CODE: 'SET_DRAFT_LANGUAGE_CODE',
    SET_TEMPLATES: 'SET_TEMPLATES',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_PRODUCT_COMPLETENESS: 'SET_PRODUCT_COMPLETENESS',
    SET_LAYOUT_ELEMENTS: 'SET_LAYOUT_ELEMENTS',
    SET_PRODUCT_DRAFT: 'SET_PRODUCT_DRAFT',
    SET_PRODUCT_TEMPLATE_ELEMENT_VALUE: 'SET_PRODUCT_TEMPLATE_ELEMENT_VALUE',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_PRODUCT_ID](state, id) {
        state.id = id;
    },
    [types.SET_PRODUCT_SKU](state, sku) {
        state.sku = sku;
    },
    [types.SET_PRODUCT_STATUS](state, status) {
        state.status = status;
    },
    [types.SET_PRODUCT_WORKFLOW](state, workflow) {
        state.workflow = workflow;
    },
    [types.SET_PRODUCT_TEMPLATE](state, template) {
        state.template = template;
    },
    [types.SET_PRODUCT_CATEGORIES](state, selectedCategories) {
        state.selectedCategories = selectedCategories;
    },
    [types.SET_DRAFT_LANGUAGE_CODE](state, languageCode) {
        state.languageCode = languageCode;
    },
    [types.SET_TEMPLATES](state, templates) {
        state.templates = templates;
    },
    [types.SET_CATEGORIES](state, categories) {
        state.categories = categories;
    },
    [types.SET_PRODUCT_COMPLETENESS](state, completeness) {
        state.completeness = completeness;
    },
    [types.SET_LAYOUT_ELEMENTS](state, layoutElements) {
        state.layoutElements = layoutElements;
    },
    [types.SET_PRODUCT_DRAFT](state, draft) {
        state.draft = draft;
    },
    [types.SET_PRODUCT_TEMPLATE_ELEMENT_VALUE](state, { index, value }) {
        state.layoutElements[index].value = value;
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
