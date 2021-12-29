/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    removeValueAtIndex,
} from '@Core/models/arrayWrapper';

export const types = {
    INSERT_MORE_COMMENTS: 'INSERT_MORE_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
};

export default {
    [types.INSERT_MORE_COMMENTS](state, moreComments) {
        state.comments = [
            ...state.comments,
            ...moreComments,
        ];
    },
    [types.DELETE_COMMENT](state, id) {
        const indexToRemove = state.comments.findIndex(e => e.id === id);
        state.comments = removeValueAtIndex(state.comments, indexToRemove);
    },
    [types.ADD_COMMENT](state, comment) {
        state.comments.unshift(comment);
    },
    [types.EDIT_COMMENT](state, comment) {
        const {
            id,
        } = comment;
        const indexToEdit = state.comments.findIndex(e => e.id === id);
        state.comments[indexToEdit] = comment;
        state.comments = [
            ...state.comments,
        ];
    },
};
