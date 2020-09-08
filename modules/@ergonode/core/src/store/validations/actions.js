/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedErrors,
} from '@Core/models/mappers/errorsMapper';

import {
    types,
} from './mutations';

export default {
    onError({
        commit,
    }, {
        errors = null, fieldKey = null,
    }) {
        if (errors) {
            commit(types.SET_ERRORS, getMappedErrors({
                errors,
                fieldKey,
            }));
        }
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
