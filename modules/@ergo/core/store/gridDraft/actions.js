/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    async updateDraftValue({
        commit, state, dispatch,
    }, {
        productId,
        columnId,
        elementId,
        languageCode,
        apiData,
        presentationValue,
        editValue,
        suffix,
        prefix,
    }) {
        const { drafts } = state;
        const path = `${languageCode}/products/${productId}/draft/${elementId}/value`;

        if (!drafts[productId]) {
            commit(types.INITIALIZE_PRODUCT_DRAFT, productId);
        }

        if (!drafts[productId][columnId]) {
            commit(types.INITIALIZE_COLUMN_PRODUCT_DRAFT, { productId, columnId });
        }

        commit(types.ADD_DRAFT_VALUE, {
            productId,
            columnId,
            value: {
                presentationValue,
                editValue,
                suffix,
                prefix,
            },
        });

        await this.app.$axios.$put(path, { value: apiData }).then(() => {
            // Clear validation error if exist
            dispatch('validations/removeValidationError', `${productId}/${elementId}`, { root: true });
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
    removeDraft({ commit }, productId) {
        commit(types.REMOVE_DRAFT, productId);
    },
    removeDraftValue({ commit }, payload) {
        commit(types.REMOVE_DRAFT_VALUE, payload);
    },
    forceDraftsMutation({ commit }) {
        commit(types.FORCE_DRAFT_MUTATION);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
