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
} from '@Attributes/services/attributeGroup';

export default {
    async createAttributeGroup({
        state,
    },
    {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
            } = state;

            const data = {
                code,
            };

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }
    },
    async getAttributeGroup(
        {
            commit,
            dispatch,
        },
        {
            id,
        },
    ) {
        const {
            code,
            name = '',
        } = await get({
            $axios: this.app.$axios,
            id,
        });

        const translations = {
            name,
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
            key: 'name',
            value: name,
        });

        dispatch('tab/setTranslations', translations, {
            root: true,
        });
    },
    getAttributeGroupsOptions({
        rootState,
    }) {
        const {
            language,
        } = rootState.authentication.user;

        return getAll({
            $axios: this.app.$axios,
        }).then(({
            collection,
        }) => ({
            options: collection.map(element => ({
                id: element.id,
                key: element.code,
                value: element.name,
                hint: element.name ? `#${element.code} ${language}` : '',
            })),
        }));
    },
    async updateAttributeGroup(
        {
            state,
            rootState,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
            } = state;
            const {
                translations: {
                    name,
                },
            } = rootState.tab;
            const data = {
                name,
            };

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeAttributeGroup({
        state,
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
