/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setDraftValue({ commit, state: { drafts } }, { rowId, columnId, value }) {
        if (!drafts[rowId]) {
            commit(types.INITIALIZE_ROW_DRAFT, rowId);
        }

        if (!drafts[rowId][columnId]) {
            commit(types.INITIALIZE_COLUMN_DRAFT, { rowId, columnId });
        }

        commit(types.SET_DRAFT_VALUE, {
            rowId,
            columnId,
            value,
        });
    },
    setDraftsValues({ commit }, drafts) {
        commit(types.SET_DRAFTS_VALUES, drafts);
    },
    setDraftRowValues({ commit, state: { drafts } }, { rowId, value }) {
        if (!drafts[rowId]) {
            commit(types.INITIALIZE_ROW_DRAFT, rowId);
        }

        commit(types.SET_DRAFT_ROW_VALUES, { rowId, value });
    },
    removeDraftRow({ commit }, rowId) {
        commit(types.REMOVE_DRAFT_ROW, rowId);
    },
    removeDraft({ commit }) {
        commit(types.REMOVE_DRAFT);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
