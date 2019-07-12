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
    addDraftValueForLanguageCode: (state, {
        productId, columnId, languageCode, value,
    }) => {
        state.drafts[productId][columnId][languageCode] = value;
        state.drafts[productId] = { ...state.drafts[productId] };
        state.drafts = { ...state.drafts };
    },
    removeDraft: (state, productId) => {
        delete state.drafts[productId];
    },
    forceDraftsMutation: (state) => {
        state.drafts = { ...state.drafts };
    },
    clearStorage: (state) => {
        state.drafts = {};
    },
};
