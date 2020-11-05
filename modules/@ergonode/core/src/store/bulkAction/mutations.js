/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    ADD_BULK_ACTION: 'ADD_BULK_ACTION',
    REMOVE_BULK_ACTION: 'REMOVE_BULK_ACTION',
};

export default {
    [types.ADD_BULK_ACTION](state, bulkAction) {
        state.bulkActions.push(bulkAction);
    },
    [types.REMOVE_BULK_ACTION](state, index) {
        state.bulkActions.splice(index, 1);
    },
};
