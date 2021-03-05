/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    ADD_ACTION_TO_QUEUE: 'ADD_ACTION_TO_QUEUE',
    REMOVE_ACTION_FROM_QUEUE: 'REMOVE_ACTION_FROM_QUEUE',
};

export default {
    [types.ADD_ACTION_TO_QUEUE](state, status) {
        state.actionsQueue.push(status);
    },
    [types.REMOVE_ACTION_FROM_QUEUE](state, index) {
        state.actionsQueue.splice(index, 1);
    },
};
