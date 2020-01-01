/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    INITIALIZE_PRODUCT_DRAFT: 'INITIALIZE_PRODUCT_DRAFT',
    INITIALIZE_COLUMN_PRODUCT_DRAFT: 'INITIALIZE_COLUMN_PRODUCT_DRAFT',
    ADD_DRAFT_VALUE_FOR_LANGUAGE_CODE: 'ADD_DRAFT_VALUE_FOR_LANGUAGE_CODE',
    REMOVE_DRAFT: 'REMOVE_DRAFT',
    REMOVE_DRAFT_VALUE: 'REMOVE_DRAFT_VALUE',
    FORCE_DRAFT_MUTATION: 'FORCE_DRAFT_MUTATION',
    CLEAR_STATE: 'CLEAR_STATE',
};
export default {
    [types.INITIALIZE_PRODUCT_DRAFT](state, productId) {
        state.drafts[productId] = {};
    },
    [types.INITIALIZE_COLUMN_PRODUCT_DRAFT](state, { productId, columnId }) {
        state.drafts[productId][columnId] = {};
    },
    [types.ADD_DRAFT_VALUE_FOR_LANGUAGE_CODE](state, {
        productId, columnId, languageCode, value,
    }) {
        state.drafts[productId][columnId][languageCode] = value;
        state.drafts[productId] = { ...state.drafts[productId] };
        state.drafts = { ...state.drafts };
    },
    [types.REMOVE_DRAFT](state, productId) {
        delete state.drafts[productId];
    },
    [types.REMOVE_DRAFT_VALUE](state, { productId, attributeId }) {
        delete state.drafts[productId][attributeId];
        state.drafts[productId] = { ...state.drafts[productId] };
    },
    [types.FORCE_DRAFT_MUTATION](state) {
        state.drafts = { ...state.drafts };
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
