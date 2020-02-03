/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    onError({ commit }, { errors, name = null }) {
        if (errors) {
            commit(types.REMOVE_VALIDATION_ERRORS);
            Object.keys(errors).forEach((errorMessage) => {
                if (!Array.isArray(errors[errorMessage])) {
                    Object.keys(errors[errorMessage]).forEach((errorNameDetailed) => {
                        const errorKey = `${errorMessage}_${errorNameDetailed}`;
                        const errorValue = errors[errorMessage][errorNameDetailed];
                        commit(types.SET_ERROR_FOR_KEY, { key: errorKey, error: errorValue });
                    });
                } else if (name) {
                    commit(types.SET_ERROR_FOR_KEY, { key: name, error: errors[errorMessage] });
                } else {
                    commit(types.SET_ERROR_FOR_KEY, {
                        key: errorMessage, error: errors[errorMessage],
                    });
                }
            });
        }
    },
    setErrorForKey({ commit }, { key, error }) {
        commit(types.SET_ERROR_FOR_KEY, { key, error });
    },
    setValidationErrors({ commit }, message) {
        commit(types.SET_VALIDATION_ERRORS, message);
    },
    appendValidationError({ commit }, message) {
        commit(types.APPEND_VALIDATION_ERROR, message);
    },
    removeValidationError({ commit, state }, key) {
        if (state.validationErrors[key]) {
            commit(types.REMOVE_VALIDATION_ERROR, key);
        }
    },
    removeValidationErrors({ commit }) {
        commit(types.REMOVE_VALIDATION_ERRORS);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
