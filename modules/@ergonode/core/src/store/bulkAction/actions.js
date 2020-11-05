/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    addBulkAction({
        commit,
    }, payload) {
        commit(types.ADD_BULK_ACTION, payload);
    },
    removeBulkAction({
        commit,
    }, index) {
        commit(types.REMOVE_BULK_ACTION, index);
    },
};
