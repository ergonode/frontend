/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import deepmerge from 'deepmerge';

export const types = {
    SET_DRAFTS: 'SET_DRAFTS',
    SET_EDIT_CELL: 'SET_EDIT_CELL',
    REMOVE_DRAFT_ROW: 'REMOVE_DRAFT_ROW',
};
export default {
    [types.SET_EDIT_CELL](state, editCell) {
        state.editCell = editCell;
    },
    [types.SET_DRAFTS](state, drafts) {
        state.drafts = deepmerge(state.drafts, drafts);
    },
    [types.REMOVE_DRAFT_ROW](state, rowId) {
        delete state.drafts[rowId];
    },
};
