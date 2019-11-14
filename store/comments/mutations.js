/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';
import { insertValueAtIndex, removeValueAtIndex } from '~/model/arrayWrapper';

export const types = {
    SET_OBJECT_ID: 'SET_OBJECT_ID',
    SET_COMMENTS: 'SET_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    CLEAR_STATE: 'CLEAR_STATE',
};

export default {
    [types.SET_OBJECT_ID](state, value) {
        state.objectId = value;
    },
    [types.SET_COMMENTS](state, value) {
        state.comments = value;
    },
    [types.DELETE_COMMENT](state, id) {
        const indexToRemove = state.comments.findIndex((e) => e.id === id);
        state.comments = removeValueAtIndex(state.comments, indexToRemove);
    },
    [types.ADD_COMMENT](state, comment) {
        state.comments.unshift(comment);
    },
    [types.EDIT_COMMENT](state, comment) {
        const { id } = comment;
        const indexToEdit = state.comments.findIndex((e) => e.id === id);
        state.comments = insertValueAtIndex(state.comments, comment, indexToEdit);
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
