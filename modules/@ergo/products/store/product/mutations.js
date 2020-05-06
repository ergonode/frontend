/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_PRODUCT_ID: 'SET_PRODUCT_ID',
    SET_PRODUCT_SKU: 'SET_PRODUCT_SKU',
    SET_PRODUCT_TYPE: 'SET_PRODUCT_TYPE',
    SET_DRAFT_VALUE: 'SET_DRAFT_VALUE',
    SET_PRODUCT_STATUS: 'SET_PRODUCT_STATUS',
    SET_PRODUCT_WORKFLOW: 'SET_PRODUCT_WORKFLOW',
    SET_PRODUCT_DATA: 'SET_PRODUCT_DATA',
    SET_PRODUCT_TEMPLATE: 'SET_PRODUCT_TEMPLATE',
    SET_BINDING_ATTRIBUTE: 'SET_BINDING_ATTRIBUTE',
    ADD_BINDING_ATTRIBUTE: 'ADD_BINDING_ATTRIBUTE',
    REMOVE_BINDING_ATTRIBUTE: 'REMOVE_BINDING_ATTRIBUTE',
    SET_PRODUCT_CATEGORIES: 'SET_PRODUCT_CATEGORIES',
    SET_TEMPLATES: 'SET_TEMPLATES',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_PRODUCT_DRAFT: 'SET_PRODUCT_DRAFT',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_PRODUCT_ID](state, id) {
        state.id = id;
    },
    [types.SET_PRODUCT_TYPE](state, type) {
        state.type = type;
    },
    [types.SET_PRODUCT_SKU](state, sku) {
        state.sku = sku;
    },
    [types.SET_PRODUCT_STATUS](state, status) {
        state.status = status;
    },
    [types.SET_BINDING_ATTRIBUTE](state, { index, attribute }) {
        state.bindingAttributes[index] = attribute;
    },
    [types.ADD_BINDING_ATTRIBUTE](state) {
        state.bindingAttributes.push(null);
    },
    [types.REMOVE_BINDING_ATTRIBUTE](state, index) {
        state.bindingAttributes.splice(index, 1);
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
    [types.SET_TEMPLATES](state, templates) {
        state.templates = templates;
    },
    [types.SET_CATEGORIES](state, categories) {
        state.categories = categories;
    },
    [types.SET_PRODUCT_DATA](state, data) {
        state.data = data;
    },
    [types.SET_PRODUCT_DRAFT](state, { languageCode, draft }) {
        state.draft = { ...state.draft, [languageCode]: draft };
    },
    [types.SET_DRAFT_VALUE](state, { languageCode, key, value }) {
        state.draft[languageCode] = { ...state.draft[languageCode], [key]: value };
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
