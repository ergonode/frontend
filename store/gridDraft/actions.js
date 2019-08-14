/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    async updateDraftValue({
        commit, state, dispatch,
    }, {
        productId, columnId, elementId, value, languageCode,
    }) {
        const { drafts } = state;
        const path = `${languageCode}/products/${productId}/draft/${elementId}/value`;

        if (!drafts[productId]) {
            commit('initializeProductDraft', productId);
        }

        if (!drafts[productId][columnId]) {
            commit('initializeColumnProductDraft', { productId, columnId });
        }

        commit('addDraftValueForLanguageCode', {
            productId, columnId, languageCode, value,
        });

        await this.app.$axios.$put(path, { value }).then(() => {
            // Clear validation error if exist
            commit('validations/removeValidationError', `${productId}/${elementId}`, { root: true });
        }).catch((e) => {
            const { code, errors } = e.data;
            if (errors) {
                dispatch('validations/onError', { code, errors, name: `${productId}/${elementId}` }, { root: true });
            } else {
                const internalServerError = { value: [e.statusText] };
                dispatch('validations/onError', { code, errors: internalServerError, name: `${productId}/${elementId}` }, { root: true });
            }
        });
    },
    addDraftValue({ commit, state, rootState }, { columnId, rowId, value }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { drafts } = state;

        if (!drafts[rowId]) {
            commit('initializeProductDraft', rowId);
        }

        if (!drafts[rowId][columnId]) {
            commit('initializeColumnProductDraft', { productId: rowId, columnId });
        }

        commit('addDraftValueForLanguageCode', {
            productId: rowId, columnId, languageCode: userLanguageCode, value,
        });
    },
    removeDraft: ({ commit }, productId) => commit('removeDraft', productId),
    forceDraftsMutation: ({ commit }) => commit('forceDraftsMutation'),
};
