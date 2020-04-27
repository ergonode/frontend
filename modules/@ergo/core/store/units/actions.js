/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setId({ commit }, value) {
        commit(types.SET_UNIT_ID, value);
    },
    setName({ commit }, value) {
        commit(types.SET_UNIT_NAME, value);
    },
    setSymbol({ commit }, value) {
        commit(types.SET_UNIT_SYMBOL, value);
    },
    async getUnitById(
        { commit, rootState },
        { unitId },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.app.$axios.$get(`${userLanguageCode}/units/${unitId}`).then(async ({
            id,
            name = '',
            symbol = '',
        }) => {
            commit(types.SET_UNIT_ID, id);
            commit(types.SET_UNIT_NAME, name);
            commit(types.SET_UNIT_SYMBOL, symbol);
        });
    },
    async updateUnit(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/units/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeUnit({ state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/units/${id}`)
            .then(() => {
                onSuccess();
            });
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
