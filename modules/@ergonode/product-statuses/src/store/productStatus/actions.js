/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    create,
    get,
    getAll,
    getDefault,
    remove,
    update,
    updateDefault,
} from '@Statuses/services/index';

export default {
    async getProductStatuses({
        commit, rootState,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        const {
            collection,
        } = await getAll({
            $axios: this.app.$axios,
        });

        commit('__SET_STATE', {
            key: 'statuses',
            value: collection.map(status => ({
                id: status.id,
                key: status.code,
                value: status.name,
                hint: status.name
                    ? `#${status.code} ${userLanguageCode}`
                    : '',
            })),
        });
    },
    async getProductStatus({
        commit, dispatch,
    }, {
        id,
    }) {
        const {
            code,
            color,
            name,
            description,
        } = await get({
            $axios: this.app.$axios,
            id,
        });

        const translations = {
            name,
            description,
        };

        commit('__SET_STATE', {
            key: 'id',
            value: id,
        });
        commit('__SET_STATE', {
            key: 'code',
            value: code,
        });
        commit('__SET_STATE', {
            key: 'color',
            value: color,
        });
        dispatch('tab/setTranslations', translations, {
            root: true,
        });
    },
    async getDefaultStatus({
        commit,
        state,
    }) {
        const {
            code,
        } = state;

        const {
            default_status: defaultStatus,
        } = await getDefault({
            $axios: this.app.$axios,
        });

        if (defaultStatus === code) {
            commit('__SET_STATE', {
                key: 'isDefaultStatus',
                value: true,
            });
        }
    },
    updateDefaultStatus({
        state,
    }) {
        if (state.isDefaultStatus) {
            const {
                id,
            } = state;

            return updateDefault({
                $axios: this.app.$axios,
                id,
            });
        }
        return null;
    },
    async updateProductStatus({
        state,
        rootState,
    }, {
        onError,
    }) {
        this.$setLoader('footerButton');

        try {
            const {
                translations: {
                    name, description,
                },
            } = rootState.tab;
            const {
                id,
                color,
            } = state;
            const data = {
                color,
                name,
                description,
            };

            update({
                $axios: this.app.$axios,
                id,
                data,
            });
        } catch (e) {
            onError(e);
        }

        this.$removeLoader('footerButton');
    },
    async createStatus(
        {
            state,
        },
        {
            onSuccess,
            onError,
        },
    ) {
        try {
            const {
                code,
                color,
            } = state;

            const data = {
                code,
                color,
            };

            await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeProductStatus({
        commit, state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        await remove({
            $axios: this.app.$axios,
            id,
        });

        onSuccess();
    },
};
