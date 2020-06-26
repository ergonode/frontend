/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getMappedErrors } from '@Core/models/mappers/errorsMapper';
import { types } from './mutations';

export default {
    onError({ commit }, { errors = null, fieldKey = null }) {
        if (errors) {
            commit(types.SET_VALIDATION_ERRORS, getMappedErrors({ errors, fieldKey }));
        }
    },
    removeValidationError({ commit }, key) {
        commit(types.REMOVE_VALIDATION_ERROR, key);
    },
    removeValidationErrors({ commit }) {
        commit(types.REMOVE_VALIDATION_ERRORS);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
