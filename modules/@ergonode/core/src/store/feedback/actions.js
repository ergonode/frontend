/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedScopedErrors,
} from '@Core/models/mappers/errorsMapper';

import {
    types,
} from './mutations';

export default {
    onScopeValueChange({
        state,
        commit,
    }, {
        scope,
        value,
        fieldKey,
    }) {
        if (scope) {
            const {
                changeValues,
            } = state;

            if (typeof changeValues[scope] === 'undefined') {
                commit(types.SET_CHANGE_VALUES_SCOPE, scope);
            }

            commit(types.SET_CHANGE_VALUES_SCOPE_FIELD_VALUE, {
                scope,
                fieldKey,
                value,
            });
        }
    },
    markChangeValuesAsSaved({
        state,
        commit,
    }, scope) {
        const {
            changeValues,
        } = state;

        if (typeof changeValues[scope] !== 'undefined') {
            commit(types.SET_CHANGE_VALUES_SCOPE_SAVE_FLAG, scope);
        }
    },
    onError({
        commit,
    }, {
        errors,
        scope = 'default',
        fieldKeys = {},
        getOnlyFirstError = false,
    }) {
        if (errors) {
            commit(types.SET_ERRORS, getMappedScopedErrors({
                errors,
                fieldKeys,
                scope,
                getOnlyFirstError,
            }));
        }
    },
    removeScopeErrors({
        commit,
    }, scope = 'default') {
        commit(types.REMOVE_SCOPE_ERRORS, scope);
    },
    removeScopeData({
        commit,
    }, scope = 'default') {
        commit(types.REMOVE_SCOPE_ERRORS, scope);
        commit(types.REMOVE_SCOPE_CHANGE_VALUES, scope);
    },
    removeScopeError({
        commit,
    }, {
        scope,
        fieldKey,
    }) {
        commit(types.REMOVE_SCOPE_ERROR, {
            scope,
            fieldKey,
        });
    },
};
