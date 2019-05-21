/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    setErrorForKey: (state, { key, error }) => {
        state.validationErrors = { ...state.validationErrors, [key]: error };
    },
    setValidationErrors: (state, errorMessage) => {
        state.validationErrors = errorMessage;
    },
    appendValidationError: (state, errorMessage) => {
        state.validationErrors = { ...state.validationErrors, ...errorMessage };
    },
    removeValidationError: (state, errorKey) => {
        state.validationErrors[errorKey] = null;
    },
    clearStorage: (state) => {
        state.validationErrors = {};
    },
};
