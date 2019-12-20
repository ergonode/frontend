/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    async updateDraftValue({
        commit, state, dispatch,
    }, {
        productId, columnId, elementId, value, languageCode,
    }) {
        const { drafts } = state;
        const path = `${languageCode}/products/${productId}/draft/${elementId}/value`;
        let parsedValue = '';

        if (!drafts[productId]) {
            commit(types.INITIALIZE_PRODUCT_DRAFT, productId);
        }

        if (!drafts[productId][columnId]) {
            commit(types.INITIALIZE_COLUMN_PRODUCT_DRAFT, { productId, columnId });
        }

        commit(types.ADD_DRAFT_VALUE_FOR_LANGUAGE_CODE, {
            productId, columnId, languageCode, value,
        });

        if (Array.isArray(value)) {
            parsedValue = value.map((val) => val.key);
        } else if (typeof value === 'object') {
            parsedValue = value.key;
        } else {
            parsedValue = value;
        }

        await this.app.$axios.$put(path, { value: parsedValue }).then(() => {
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
    addDraftValue({ commit, state, rootState }, { columnId, rowId, value }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { drafts } = state;

        if (!drafts[rowId]) {
            commit(types.INITIALIZE_PRODUCT_DRAFT, rowId);
        }

        if (!drafts[rowId][columnId]) {
            commit(types.INITIALIZE_COLUMN_PRODUCT_DRAFT, { productId: rowId, columnId });
        }

        commit(types.ADD_DRAFT_VALUE_FOR_LANGUAGE_CODE, {
            productId: rowId, columnId, languageCode: userLanguageCode, value,
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
