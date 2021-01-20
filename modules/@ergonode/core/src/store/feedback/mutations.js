/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import deepmerge from 'deepmerge';

export const types = {
    SET_ERRORS: 'SET_ERRORS',
    SET_CHANGE_VALUES_SCOPE: 'SET_CHANGE_VALUES_SCOPE',
    SET_CHANGE_VALUES_SCOPE_FIELD_VALUE: 'SET_CHANGE_VALUES_SCOPE_FIELD_VALUE',
    SET_CHANGE_VALUES_SCOPE_SAVE_FLAG: 'SET_CHANGE_VALUES_SCOPE_SAVE_FLAG',
    REMOVE_ERROR: 'REMOVE_ERROR',
    REMOVE_SCOPE_ERROR: 'REMOVE_SCOPE_ERROR',
    REMOVE_SCOPE_ERRORS: 'REMOVE_SCOPE_ERRORS',
    REMOVE_SCOPE_CHANGE_VALUES: 'REMOVE_SCOPE_CHANGE_VALUES',
    REMOVE_ERRORS: 'REMOVE_ERRORS',
    REMOVE_CHANGE_VALUES: 'REMOVE_CHANGE_VALUES',
};

export default {
    [types.SET_ERRORS](state, errors) {
        state.errors = deepmerge(state.errors, errors);
    },
    [types.SET_CHANGE_VALUES_SCOPE](state, scope) {
        state.changeValues[scope] = {};
    },
    [types.SET_CHANGE_VALUES_SCOPE_SAVE_FLAG](state, scope) {
        state.changeValues[scope] = {
            saved: true,
        };

        state.changeValues = {
            ...state.changeValues,
        };
    },
    [types.SET_CHANGE_VALUES_SCOPE_FIELD_VALUE](state, {
        scope,
        fieldKey,
        value,
    }) {
        state.changeValues = {
            ...state.changeValues,
            [scope]: {
                ...state.changeValues[scope],
                [fieldKey]: value,
                saved: false,
            },
        };
    },
    [types.REMOVE_ERROR](state, key) {
        delete state.errors[key];
        state.errors = {
            ...state.errors,
        };
    },
    [types.REMOVE_SCOPE_ERRORS](state, scope) {
        delete state.errors[scope];
        state.errors = {
            ...state.errors,
        };
    },
    [types.REMOVE_SCOPE_CHANGE_VALUES](state, scope) {
        delete state.changeValues[scope];
        state.changeValues = {
            ...state.changeValues,
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
    [types.REMOVE_CHANGE_VALUES](state) {
        state.errors = {};
    },
};
