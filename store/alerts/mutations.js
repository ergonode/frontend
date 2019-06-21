/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import types from './mutation-types';

export default {
    [types.APPEND_ALERT](state, payload) {
        state.alerts.push(payload);
    },
    [types.REMOVE_ALERT](state, index) {
        state.alerts.splice(index, 1);
    },
};
