/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import deepmerge from 'deepmerge';

import defaultState from './state';

export const types = {
    SET_DRAFTS: 'SET_DRAFTS',
    SET_EDIT_CELL: 'SET_EDIT_CELL',
    REMOVE_DRAFT_ROW: 'REMOVE_DRAFT_ROW',
    CLEAR_STATE: 'CLEAR_STATE',
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
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
