/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    ADD_ACTION_TO_QUEUE: 'ADD_ACTION_TO_QUEUE',
    REMOVE_BATCH_ACTION: 'REMOVE_BATCH_ACTION',
};

export default {
    [types.ADD_ACTION_TO_QUEUE](state, status) {
        state.actionsQueue.push(status);
    },
    [types.REMOVE_BATCH_ACTION](state, id) {
        const index = state.actions.findIndex(
            action => action.id === id,
        );

        state.actions.splice(index, 1);
    },
};
