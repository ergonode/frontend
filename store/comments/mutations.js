/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import defaultState from './state';
import { removeValueAtIndex } from '~/model/arrayWrapper';

export const types = {
    SET_OBJECT_ID: 'SET_OBJECT_ID',
    SET_COMMENTS: 'SET_COMMENTS',
    INSERT_MORE_COMMENTS: 'INSERT_MORE_COMMENTS',
    SET_COUNT: 'SET_COUNT',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
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
    [types.INSERT_MORE_COMMENTS](state, moreComments) {
        state.comments = [
            ...state.comments,
            ...moreComments,
        ];
    },
    [types.SET_COUNT](state, value) {
        state.count = value;
    },
    [types.SET_CURRENT_PAGE](state, value) {
        state.currentPage = value;
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
        state.comments[indexToEdit] = comment;
        state.comments = [...state.comments];
    },
    [types.CLEAR_STATE](state) {
        const states = defaultState();
        Object.keys(states).forEach((key) => {
            state[key] = states[key];
        });
    },
};
