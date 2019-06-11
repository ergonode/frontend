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
        const { [productId]: { draftId } } = drafts;
        const path = `${languageCode}/drafts/${draftId}/${elementId}/value`;

        if (!drafts[productId][columnId]) {
            commit('addColumnKey', { productId, columnId });
        }
        commit('addColumnKeyValue', { productId, columnId, value });

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
    getDraft({ commit, state }, {
        id, languageCode, onError,
    }) {
        if (state.drafts[id]) return null;

        return this.app.$axios.$get(`${languageCode}/drafts/product/${id}`).then(({
            draft_id: draftId,
            product_id: productId,
        }) => {
            commit('addRowKey', { productId });
            commit('addDraftKey', { productId, draftId });
        }).catch(e => onError(e.data));
    },
    applyDraft({ rootState }, {
        id, onSuccess, onError,
    }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/drafts/${id}/persist`, {}).then(response => onSuccess(response)).catch(e => onError(e.data));
    },
    removeDraft: ({ commit }, { productId }) => commit('removeDraft', { productId }),
    forceDraftsMutation: ({ commit }) => commit('forceDraftsMutation'),
};
