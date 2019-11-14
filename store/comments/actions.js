/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

const onDefaultError = () => {};

export default {
    setCommentObjectId({ commit }, value) {
        commit(types.SET_OBJECT_ID, value);
    },
    getComments({ commit, rootState }, params) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/comments`, { params }).then(({ collection: comments }) => {
            commit(types.SET_COMMENTS, comments);
        }).catch(onDefaultError);
    },
    createComment(
        { commit, rootState, state },
        {
            content,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
            first_name: firstName,
            last_name: lastName,
            avatar_id: avatarId,
        } = rootState.authentication.user;
        const { objectId } = state;
        const data = {
            content,
            object_id: objectId,
        };
        return this.app.$axios.$post(`${userLanguageCode}/comments`, data).then(({ id }) => {
            this.app.$axios.$get(`${userLanguageCode}/comments/${id}`).then((addedComment) => {
                const comment = {
                    ...addedComment,
                    _links: {
                        delete: true,
                        edit: true,
                    },
                    avatar_id: avatarId,
                    author: `${firstName} ${lastName}`,
                };
                commit(types.ADD_COMMENT, comment);
                onSuccess(id);
            }).catch(onDefaultError);
        }).catch((e) => onError(e.data));
    },
    updateComment(
        { commit, rootState },
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
            first_name: firstName,
            last_name: lastName,
            avatar_id: avatarId,
        } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/comments/${id}`, data).then(() => {
            this.app.$axios.$get(`${userLanguageCode}/comments/${id}`).then((editedComment) => {
                const comment = {
                    ...editedComment,
                    _links: {
                        delete: true,
                        edit: true,
                    },
                    avatar_id: avatarId,
                    author: `${firstName} ${lastName}`,
                };
                commit(types.EDIT_COMMENT, comment);
                onSuccess();
            }).catch(onDefaultError);
        }).catch((e) => onError(e.data));
    },
    removeComment(
        { commit, rootState },
        {
            id,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/comments/${id}`).then(() => {
            commit(types.DELETE_COMMENT, id);
            onSuccess();
        }).catch((e) => onError(e.data));
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
