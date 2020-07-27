/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_VALIDATION_ERRORS: 'SET_VALIDATION_ERRORS',
    REMOVE_VALIDATION_ERROR: 'REMOVE_VALIDATION_ERROR',
    REMOVE_VALIDATION_ERRORS: 'REMOVE_VALIDATION_ERRORS',
};
export default {
    [types.SET_VALIDATION_ERRORS](state, errors) {
        state.validationErrors = {
            ...state.validationErrors,
            ...errors,
        };
    },
    [types.REMOVE_VALIDATION_ERROR](state, key) {
        delete state.validationErrors[key];
        state.validationErrors = {
            ...state.validationErrors,
        };
    },
    [types.REMOVE_VALIDATION_ERRORS](state) {
        state.validationErrors = {};
    },
};
