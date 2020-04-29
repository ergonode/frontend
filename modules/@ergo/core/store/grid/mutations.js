/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    INITIALIZE_ROW_DRAFT: 'INITIALIZE_ROW_DRAFT',
    INITIALIZE_COLUMN_DRAFT: 'INITIALIZE_COLUMN_DRAFT',
    SET_DRAFT_VALUE: 'SET_DRAFT_VALUE',
    SET_DRAFTS_VALUES: 'SET_DRAFTS_VALUES',
    SET_DRAFT_ROW_VALUES: 'SET_DRAFT_ROW_VALUES',
    SET_DRAFTS: 'SET_DRAFTS',
    REMOVE_DRAFT_ROW: 'REMOVE_DRAFT_ROW',
    REMOVE_DRAFT: 'REMOVE_DRAFT',
    CLEAR_STATE: 'CLEAR_STATE',
};
export default {
    [types.INITIALIZE_ROW_DRAFT](state, rowId) {
        state.drafts[rowId] = {};
    },
    [types.INITIALIZE_COLUMN_DRAFT](state, { rowId, columnId }) {
        state.drafts[rowId][columnId] = {};
    },
    [types.SET_DRAFTS_VALUES](state, drafts) {
        state.drafts = { ...state.drafts, ...drafts };
    },
    [types.SET_DRAFT_ROW_VALUES](state, { rowId, value }) {
        state.drafts[rowId] = value;
        state.drafts = { ...state.drafts };
    },
    [types.SET_DRAFT_VALUE](state, {
        rowId, columnId, value,
    }) {
        state.drafts[rowId][columnId] = value;
        state.drafts = { ...state.drafts };
    },
    [types.REMOVE_DRAFT_ROW](state, rowId) {
        delete state.drafts[rowId];
    },
    [types.REMOVE_DRAFT](state) {
        state.drafts = {};
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
