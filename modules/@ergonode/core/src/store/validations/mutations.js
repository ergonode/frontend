/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_ERRORS: 'SET_ERRORS',
    REMOVE_ERROR: 'REMOVE_ERROR',
    REMOVE_SCOPE_ERROR: 'REMOVE_SCOPE_ERROR',
    REMOVE_ERRORS: 'REMOVE_ERRORS',
};
export default {
    [types.SET_ERRORS](state, errors) {
        state.errors = {
            ...state.errors,
            ...errors,
        };
    },
    [types.REMOVE_ERROR](state, key) {
        delete state.errors[key];
        state.errors = {
            ...state.errors,
        };
    },
    [types.REMOVE_SCOPE_ERROR](state, {
        scope,
        fieldKey,
    }) {
        delete state.errors[scope][fieldKey];
        state.errors[scope] = {
            ...state.errors[scope],
        };
    },
    [types.REMOVE_ERRORS](state) {
        state.errors = {};
    },
};
