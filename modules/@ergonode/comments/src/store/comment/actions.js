/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    getAll,
    remove,
    update,
} from '@Comments/services/index';

import {
    types,
} from './mutations';

export default {
    async getComments({
        commit,
    }, params) {
        const {
            collection: comments, info,
        } = await getAll({
            $axios: this.app.$axios,
            params,
        });

        commit('__SET_STATE', {
            key: 'comments',
            value: comments,
        });
        commit('__SET_STATE', {
            key: 'count',
            value: info.filtered,
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
        this.$setLoader('moreComments');

        let {
            currentPage,
        } = state;

        const {
            collection: comments, info,
        } = await getAll({
            $axios: this.app.$axios,
            params,
        });

        commit('__SET_STATE', {
            key: 'currentPage',
            value: currentPage += 1,
        });
        commit('__SET_STATE', {
            key: 'count',
            value: info.filtered,
        });
        commit(types.INSERT_MORE_COMMENTS, comments);

        this.$removeLoader('moreComments');
    },
    async createComment(
        {
            commit,
            rootState,
            state,
        },
        {
            content,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        this.$setLoader('commentButton');

        try {
            const {
                firstName,
                lastName,
                avatarFilename,
            } = rootState.authentication.user;
            const {
                objectId,
            } = state;
            const {
                count,
            } = state;
            const data = {
                content,
                object_id: objectId,
            };

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            const comment = await get({
                $axios: this.app.$axios,
                id,
            });

            commit(types.ADD_COMMENT, {
                ...comment,
                _links: {
                    delete: true,
                    edit: true,
                },
                avatar_filename: avatarFilename,
                author: `${firstName} ${lastName}`,
            });
            commit('__SET_STATE', {
                key: 'count',
                value: count + 1,
            });
            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }

        this.$removeLoader('commentButton');
    },
    async updateComment(
        {
            commit,
            rootState,
        },
        {
            id,
            content,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        this.$setLoader('commentButton');

        try {
            const data = {
                content,
            };
            const {
                firstName,
                lastName,
                avatarFilename,
            } = rootState.authentication.user;

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });
            const comment = await get({
                $axios: this.app.$axios,
                id,
            });

            commit(types.EDIT_COMMENT, {
                ...comment,
                _links: {
                    delete: true,
                    edit: true,
                },
                avatar_filename: avatarFilename,
                author: `${firstName} ${lastName}`,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }

        this.$removeLoader('commentButton');
    },
    async removeComment(
        {
            commit,
            state,
        },
        {
            id,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                count,
            } = state;

            await remove({
                $axios: this.app.$axios,
                id,
            });

            commit(types.DELETE_COMMENT, id);
            commit('__SET_STATE', {
                key: 'count',
                value: count - 1,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
};
