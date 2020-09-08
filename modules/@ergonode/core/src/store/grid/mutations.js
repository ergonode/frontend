/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const types = {
    SET_DRAFTS: 'SET_DRAFTS',
    REMOVE_DRAFT_ROW: 'REMOVE_DRAFT_ROW',
};
export default {
    [types.SET_DRAFTS](state, drafts) {
        state.drafts = drafts;
    },
    [types.REMOVE_DRAFT_ROW](state, rowId) {
        delete state.drafts[rowId];
    },
};
