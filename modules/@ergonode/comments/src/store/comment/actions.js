/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    getComments({
        commit,
    }, params) {
        return this.app.$axios.$get('comments', {
            params,
        }).then(({
            collection: comments, info,
        }) => {
            commit('__SET_STATE', {
                key: 'comments',
                value: comments,
            });
            commit('__SET_STATE', {
                key: 'count',
                value: info.filtered,
            });
        });
    },
    async getMoreComments(
        {
            commit, state,
        },
        {
            params,
        },
    ) {
        let {
            currentPage,
        } = state;

        await this.$setLoader('moreComments');
        await this.app.$axios.$get('comments', {
            params,
        }).then(({
            collection: comments, info,
        }) => {
            commit('__SET_STATE', {
                key: 'currentPage',
                value: currentPage += 1,
            });
            commit('__SET_STATE', {
                key: 'count',
                value: info.filtered,
            });
            commit(types.INSERT_MORE_COMMENTS, comments);
        });
        await this.$removeLoader('moreComments');
    },
    async createComment(
        {
            commit, rootState, state,
        },
        {
            content,
            onSuccess,
            onError,
        },
    ) {
        const {
            firstName,
            lastName,
            avatarFilename,
        } = rootState.authentication.user;
        const {
            objectId,
        } = state;
        let {
            count,
        } = state;
        const data = {
            content,
            object_id: objectId,
        };

        await this.$setLoader('commentButton');
        await this.app.$axios.$post('comments', data).then(({
            id,
        }) => {
            this.app.$axios.$get(`comments/${id}`).then((addedComment) => {
                const comment = {
                    ...addedComment,
                    _links: {
                        delete: true,
                        edit: true,
                    },
                    avatar_filename: avatarFilename,
                    author: `${firstName} ${lastName}`,
                };
                commit(types.ADD_COMMENT, comment);
                commit('__SET_STATE', {
                    key: 'count',
                    value: count += 1,
                });
                onSuccess(id);
            });
        }).catch(e => onError(e.data));
        await this.$removeLoader('commentButton');
    },
    async updateComment(
        {
            commit, rootState,
        },
        {
            id,
            content,
            onSuccess,
            onError,
        },
    ) {
        const data = {
            content,
        };
        const {
            firstName,
            lastName,
            avatarFilename,
        } = rootState.authentication.user;

        await this.$setLoader('commentButton');
        await this.app.$axios.$put(`comments/${id}`, data).then(() => {
            this.app.$axios.$get(`comments/${id}`).then((editedComment) => {
                const comment = {
                    ...editedComment,
                    _links: {
                        delete: true,
                        edit: true,
                    },
                    avatar_filename: avatarFilename,
                    author: `${firstName} ${lastName}`,
                };
                commit(types.EDIT_COMMENT, comment);
                onSuccess();
            });
        }).catch(e => onError(e.data));
        await this.$removeLoader('commentButton');
    },
    removeComment(
        {
            commit, state,
        },
        {
            id,
            onSuccess,
            onError,
        },
    ) {
        let {
            count,
        } = state;
        return this.app.$axios.$delete(`comments/${id}`).then(() => {
            commit(types.DELETE_COMMENT, id);
            commit('__SET_STATE', {
                key: 'count',
                value: count -= 1,
            });
            onSuccess();
        }).catch(e => onError(e.data));
    },
};
