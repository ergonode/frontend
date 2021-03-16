/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
    ALERT_TYPE,
} from '@Core/defaults/alerts';

import {
    types,
} from './mutations';

export default {
    async getComments({
        commit,
    }, {
        params,
        onError = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/getComments/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            const data = await getAll({
                $axios: this.app.$axios,
                params,
            });
            const {
                collection: comments,
                info,
            } = data;

            commit('__SET_STATE', {
                key: 'comments',
                value: comments,
            });
            commit('__SET_STATE', {
                key: 'count',
                value: info.filtered,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/getComments/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getMoreComments(
        {
            commit, state,
        },
        {
            params,
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/getMoreComments/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            let {
                currentPage,
            } = state;
            const data = await getAll({
                $axios: this.app.$axios,
                params,
            });
            const {
                collection: comments,
                info,
            } = data;

            commit('__SET_STATE', {
                key: 'currentPage',
                value: currentPage += 1,
            });
            commit('__SET_STATE', {
                key: 'count',
                value: info.filtered,
            });
            commit(types.INSERT_MORE_COMMENTS, comments);

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/getMoreComments/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async createComment(
        {
            commit,
            rootState,
            state,
        },
        {
            content,
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
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
            let data = {
                content,
                object_id: objectId,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Comments/store/comment/action/createComment/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });
            // EXTENDED BEFORE METHOD

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

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/createComment/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Creating comment has been canceled',
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateComment(
        {
            commit,
            rootState,
        },
        {
            id,
            scope,
            content,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                firstName,
                lastName,
                avatarFilename,
            } = rootState.authentication.user;
            let data = {
                content,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Comments/store/comment/action/updateComment/__before', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

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

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/updateComment/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Updating comment has been canceled',
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
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

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/removeComment/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            commit(types.DELETE_COMMENT, id);
            commit('__SET_STATE', {
                key: 'count',
                value: count - 1,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Comments/store/comment/action/removeComment/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Removing comment has been canceled',
                });

                return;
            }

            onError({
                errors: e.data.errors,
            });
        }
    },
};
