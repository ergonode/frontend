/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    ADD_MODAL: 'ADD_MODAL',
    REMOVE_MODAL: 'REMOVE_MODAL',
};

export default {
    [types.ADD_MODAL](state, modal) {
        state.modals.push(modal);
    },
    [types.REMOVE_MODAL](state, index) {
        state.modals.splice(index, 1);
    },
};
