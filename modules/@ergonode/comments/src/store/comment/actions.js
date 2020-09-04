/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    types,
} from './mutations';

export default {
    getComments({
        commit, rootState,
    }, params) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/comments`, {
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
            commit, rootState, state,
        },
        {
            params,
        },
    ) {
        let {
            currentPage,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.$setLoader('moreComments');
        await this.app.$axios.$get(`${userLanguageCode}/comments`, {
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
            language: userLanguageCode,
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
        await this.app.$axios.$post(`${userLanguageCode}/comments`, data).then(({
            id,
        }) => {
            this.app.$axios.$get(`${userLanguageCode}/comments/${id}`).then((addedComment) => {
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
            language: userLanguageCode,
            firstName,
            lastName,
            avatarFilename,
        } = rootState.authentication.user;

        await this.$setLoader('commentButton');
        await this.app.$axios.$put(`${userLanguageCode}/comments/${id}`, data).then(() => {
            this.app.$axios.$get(`${userLanguageCode}/comments/${id}`).then((editedComment) => {
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
            commit, rootState, state,
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
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/comments/${id}`).then(() => {
            commit(types.DELETE_COMMENT, id);
            commit('__SET_STATE', {
                key: 'count',
                value: count -= 1,
            });
            onSuccess();
        }).catch(e => onError(e.data));
    },
};
