/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    onError: ({ commit }, { errors, name = null }) => {
        if (errors) {
            commit('clearStorage');
            Object.keys(errors).forEach((errorMessage) => {
                if (!Array.isArray(errors[errorMessage])) {
                    Object.keys(errors[errorMessage]).forEach((errorNameDetailed) => {
                        const errorKey = `${errorMessage}_${errorNameDetailed}`;
                        const errorValue = errors[errorMessage][errorNameDetailed];
                        commit('setErrorForKey', { key: errorKey, error: errorValue });
                    });
                } else if (name) {
                    commit('setErrorForKey', { key: name, error: errors[errorMessage] });
                } else {
                    commit('setErrorForKey', { key: errorMessage, error: errors[errorMessage] });
                }
            });
        }
    },
    setValidationErrors: ({ commit }, payload) => {
        commit('setValidationErrors', payload);
    },
    appendValidationError: ({ commit }, payload) => {
        commit('appendValidationError', payload);
    },
    removeValidationError: ({ commit, state }, payload) => {
        if (state.validationErrors[payload]) {
            commit('removeValidationError', payload);
        }
    },
    removeValidationErrors: ({ commit }) => {
        commit('clearStorage');
    },
};
