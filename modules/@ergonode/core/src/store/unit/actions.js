/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    remove,
    update,
} from '@Core/services/unit/index';

export default {
    async getUnit(
        {
            commit,
        },
        {
            id,
        },
    ) {
        const {
            name,
            symbol,
        } = await get({
            $axios: this.app.$axios,
            id,
        });

        commit('__SET_STATE', {
            key: 'id',
            value: id,
        });
        commit('__SET_STATE', {
            key: 'name',
            value: name,
        });
        commit('__SET_STATE', {
            key: 'symbol',
            value: symbol,
        });
    },
    async updateUnit(
        {
            state,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        const {
            id, name, symbol,
        } = state;
        const data = {
            name,
            symbol,
        };

        try {
            await update({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createUnit({
        state,
    }, {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                name,
                symbol,
            } = state;

            const data = {
                name,
                symbol,
            };

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });
            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeUnit({
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
