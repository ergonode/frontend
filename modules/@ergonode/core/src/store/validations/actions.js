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
    }, scope) {
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
    removeErrors({
        commit,
    }) {
        commit(types.REMOVE_ERRORS);
    },
};
