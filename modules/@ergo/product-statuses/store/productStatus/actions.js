/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    setCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    setColor({ commit }, color) {
        commit(types.SET_COLOR, color);
    },
    getProductStatuses({ commit, rootState }, params) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/status`, { params }).then(({ collection: statuses }) => {
            commit(types.SET_STATUSES, statuses.map(status => ({
                id: status.id,
                key: status.code,
                value: status.name,
                hint: status.name
                    ? `#${status.code} ${userLanguageCode}`
                    : '',
            })));
        });
    },
    getProductStatus({ commit, dispatch }, path) {
        return this.app.$axios.$get(path).then(({
            id, code, color, name, description,
        }) => {
            const translations = {
                name,
                description,
            };

            commit(types.SET_STATUS_ID, id);
            commit(types.SET_CODE, code);
            commit(types.SET_COLOR, color);
            dispatch('translations/setTabTranslations', translations, { root: true });
        });
    },
    getDefaultStatus({ commit, state, rootState }) {
        const { language: userLanguageCode } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/workflow/default`).then(({ default_status: defaultStatus }) => {
            if (defaultStatus === state.code) {
                commit(types.SET_AS_DEFAULT_STATUS, true);
            }
        });
    },
    updateDefaultStatus({ commit, state, rootState }) {
        if (state.isDefaultStatus) {
            const { language: userLanguageCode } = rootState.authentication.user;

            return this.app.$axios.$put(`${userLanguageCode}/workflow/default/status/${state.id}/default`);
        }
        return null;
    },
    async updateProductStatus({ commit, state, rootState }, { onError }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { translations: { name, description } } = rootState.translations;
        const data = {
            color: state.color,
            name,
            description,
        };

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/status/${state.id}`, data).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    setStatusAsDefault({ commit }, isDefault) {
        commit(types.SET_AS_DEFAULT_STATUS, isDefault);
    },
    removeProductStatus({ commit, state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/status/${id}`).then(() => onSuccess());
    },
    clearStorage: ({ commit }) => {
        commit(types.CLEAR_STATE);
    },
};
