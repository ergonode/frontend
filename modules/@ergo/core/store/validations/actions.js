/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    onError({ commit }, { errors, name = null }) {
        if (errors) {
            commit(types.REMOVE_VALIDATION_ERRORS);
            let mappedErrors = {};

            Object.keys(errors).forEach((errorMessage) => {
                if (!Array.isArray(errors[errorMessage])) {
                    mappedErrors = {
                        ...mappedErrors,
                        ...Object.keys(errors[errorMessage]).map(errorNameDetailed => ({
                            [`${errorMessage}_${errorNameDetailed}`]: errors[errorMessage][errorNameDetailed],
                        })),
                    };
                } else if (name) {
                    mappedErrors[name] = errors[errorMessage];
                } else {
                    mappedErrors[errorMessage] = errors[errorMessage];
                }
            });

            commit(types.SET_ERRORS, mappedErrors);
        }
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
