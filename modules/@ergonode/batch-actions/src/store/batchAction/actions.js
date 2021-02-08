/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    addBatchAction({
        commit,
    }, payload) {
        commit(types.ADD_BATCH_ACTION, payload);
    },
    removeBatchAction({
        commit,
    }, index) {
        commit(types.REMOVE_BATCH_ACTION, index);
    },
};
