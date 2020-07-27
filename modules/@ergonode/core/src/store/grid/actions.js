/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    setDrafts({
        commit,
    }, drafts = {}) {
        commit(types.SET_DRAFTS, drafts);
    },
    setEditCell({
        commit,
    }, editCell = null) {
        commit(types.SET_EDIT_CELL, editCell);
    },
    removeDraftRow({
        commit,
    }, rowId) {
        commit(types.REMOVE_DRAFT_ROW, rowId);
    },
};
