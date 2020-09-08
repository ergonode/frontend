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
            onError(e.data);
        }
    },
    async createUnit({
        state,
    }, {
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
            onError(e.data);
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
