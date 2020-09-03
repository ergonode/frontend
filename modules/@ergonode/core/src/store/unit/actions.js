/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    async getUnit(
        {
            commit,
        },
        {
            unitId,
        },
    ) {
        await this.app.$axios.$get(`units/${unitId}`).then(async ({
            id,
            name = '',
            symbol = '',
        }) => {
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
        });
    },
    async updateUnit(
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`units/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeUnit({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return this.app.$axios.$delete(`units/${id}`)
            .then(() => {
                onSuccess();
            });
    },
};
