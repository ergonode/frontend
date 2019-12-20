/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    SET_ERROR_FOR_KEY: 'SET_ERROR_FOR_KEY',
    SET_VALIDATION_ERRORS: 'SET_VALIDATION_ERRORS',
    APPEND_VALIDATION_ERROR: 'APPEND_VALIDATION_ERROR',
    REMOVE_VALIDATION_ERROR: 'REMOVE_VALIDATION_ERROR',
    REMOVE_VALIDATION_ERRORS: 'REMOVE_VALIDATION_ERRORS',
    CLEAR_STATE: 'CLEAR_STATE',
};
export default {
    [types.SET_ERROR_FOR_KEY](state, { key, error }) {
        state.validationErrors = { ...state.validationErrors, [key]: error };
    },
    [types.SET_VALIDATION_ERRORS](state, errorMessage) {
        state.validationErrors = errorMessage;
    },
    [types.APPEND_VALIDATION_ERROR](state, errorMessage) {
        state.validationErrors = { ...state.validationErrors, ...errorMessage };
    },
    [types.REMOVE_VALIDATION_ERROR](state, errorKey) {
        delete state.validationErrors[errorKey];
        state.validationErrors = { ...state.validationErrors };
    },
    [types.REMOVE_VALIDATION_ERRORS](state) {
        state.validationErrors = {};
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
