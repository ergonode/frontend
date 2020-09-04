/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    async getUnit(
        {
            commit, rootState,
        },
        {
            unitId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.app.$axios.$get(`${userLanguageCode}/units/${unitId}`).then(async ({
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
        {
            rootState,
        },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/units/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeUnit({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/units/${id}`)
            .then(() => {
                onSuccess();
            });
    },
};
