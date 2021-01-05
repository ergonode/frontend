/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedErrorsV2,
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
    }) {
        if (errors) {
            commit(types.SET_ERRORS, getMappedErrorsV2({
                errors,
                fieldKeys,
                scope,
            }));
        }
    },
    removeScopeErrors({
        commit,
    }, scope = 'default') {
        commit(types.REMOVE_SCOPE_ERRORS, scope);
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
    removeError({
        commit,
    }, key) {
        commit(types.REMOVE_ERROR, key);
    },
};
