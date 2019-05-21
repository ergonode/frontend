/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    addRowKey: (state, { productId }) => {
        state.drafts[productId] = {};
    },
    addDraftKey: (state, { productId, draftId }) => {
        state.drafts[productId].draftId = draftId;
    },
    addColumnKey: (state, { productId, columnId }) => {
        state.drafts[productId][columnId] = {};
    },
    addColumnKeyValue: (state, { productId, columnId, value }) => {
        state.drafts[productId][columnId] = value;
        state.drafts[productId] = { ...state.drafts[productId] };
        state.drafts = { ...state.drafts };
    },
    removeDraft: (state, { productId }) => {
        delete state.drafts[productId];
    },
    forceDraftsMutation: (state) => {
        state.drafts = { ...state.drafts };
    },
    clearStorage: (state) => {
        state.drafts = {};
    },
};
