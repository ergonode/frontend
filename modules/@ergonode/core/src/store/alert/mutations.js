/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    ADD_ALERT: 'ADD_ALERT',
    REMOVE_ALERT: 'REMOVE_ALERT',
};

export default {
    [types.ADD_ALERT](state, payload) {
        state.alerts.push(payload);
    },
    [types.REMOVE_ALERT](state, index) {
        state.alerts.splice(index, 1);
    },
};
