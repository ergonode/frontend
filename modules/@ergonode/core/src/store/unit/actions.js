/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import unitService from '@Core/services/unit/index';

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
        } = await unitService.get({
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
            onSuccess,
            onError,
        },
    ) {
        const {
            id, name, symbol,
        } = state;
        const data = {
            name,
            symbol,
        };
        await this.$setLoader('footerButton');
        try {
            await unitService.update({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError(e.data);
        }
        await this.$removeLoader('footerButton');
    },
    async removeUnit({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        await unitService.remove({
            $axios: this.app.$axios,
            id,
        });
        onSuccess();
    },
};
