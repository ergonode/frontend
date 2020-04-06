/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';

export const types = {
    INITIALIZE_ROW_DRAFT: 'INITIALIZE_ROW_DRAFT',
    INITIALIZE_COLUMN_DRAFT: 'INITIALIZE_COLUMN_DRAFT',
    SET_DRAFT_VALUE: 'SET_DRAFT_VALUE',
    REMOVE_DRAFT: 'REMOVE_DRAFT',
    REMOVE_DRAFT_VALUE: 'REMOVE_DRAFT_VALUE',
    FORCE_DRAFT_MUTATION: 'FORCE_DRAFT_MUTATION',
    CLEAR_STATE: 'CLEAR_STATE',
};
export default {
    [types.INITIALIZE_ROW_DRAFT](state, rowId) {
        state.drafts[rowId] = {};
    },
    [types.INITIALIZE_COLUMN_DRAFT](state, { rowId, columnId }) {
        state.drafts[rowId][columnId] = {};
    },
    [types.SET_DRAFT_VALUE](state, {
        rowId, columnId, value,
    }) {
        state.drafts[rowId][columnId] = value;
        state.drafts[rowId] = { ...state.drafts[rowId] };
        state.drafts = { ...state.drafts };
    },
    [types.REMOVE_DRAFT](state, productId) {
        delete state.drafts[productId];
    },
    [types.REMOVE_DRAFT_VALUE](state, { productId, attributeId }) {
        delete state.drafts[productId][attributeId];
        state.drafts[productId] = { ...state.drafts[productId] };
    },
    [types.FORCE_DRAFT_MUTATION](state) {
        state.drafts = { ...state.drafts };
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
