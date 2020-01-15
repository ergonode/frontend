/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    initializeProductDraft: (state, productId) => {
        state.drafts[productId] = {};
    },
    initializeColumnProductDraft: (state, { productId, columnId }) => {
        state.drafts[productId][columnId] = {};
    },
    addDraftValue: (state, {
        productId, columnId, value,
    }) => {
        state.drafts[productId][columnId] = value;
        state.drafts[productId] = { ...state.drafts[productId] };
        state.drafts = { ...state.drafts };
    },
    removeDraft: (state, productId) => {
        delete state.drafts[productId];
    },
    removeDraftValue: (state, { productId, columnId }) => {
        delete state.drafts[productId][columnId];
        state.drafts[productId] = { ...state.drafts[productId] };
    },
    forceDraftsMutation: (state) => {
        state.drafts = { ...state.drafts };
    },
    clearStorage: (state) => {
        state.drafts = {};
    },
};
