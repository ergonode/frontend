/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

const onDefaultError = () => {};

export default {
    setCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    setColor({ commit }, color) {
        commit(types.SET_COLOR, color);
    },
    createProductStatus({ commit, state, rootState }, { onSuccess, onError }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const data = {
            code: state.code,
            color: state.color,
        };
        return this.app.$axios.$post(`${userLanguageCode}/status`, data).then(({ id }) => {
            commit(types.SET_STATUS_ID, id);
            onSuccess(id);
        }).catch((e) => onError(e.data));
    },
    getProductStatuses({ commit, rootState }, params) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/status`, { params }).then(({ collection: statuses }) => {
            commit(types.SET_STATUSES, statuses.map((status) => status.code));
        }).catch(onDefaultError);
    },
    getProductStatus({ commit }, { path }) {
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

            commit('translations/setTabTranslations', translations, { root: true });
        }).catch(onDefaultError);
    },
    updateProductStatus({ commit, state, rootState }, { onSuccess, onError }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        const { translations } = rootState.translations;

        let { name, description } = translations;

        if (isThereAnyTranslation(name)) {
            name = getParsedTranslations(name);
        }

        if (isThereAnyTranslation(description)) {
            description = getParsedTranslations(description);
        }

        const data = {
            color: state.color,
            name,
            description,
        };

        return this.app.$axios.$put(`${userLanguageCode}/status/${state.id}`, data).then(() => {
            onSuccess();
        }).catch((e) => onError(e.data));
    },
    removeProductStatus({ commit, state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/status/${id}`).then(() => onSuccess()).catch(onDefaultError);
    },
    clearStorage: ({ commit }) => {
        commit(types.CLEAR_STATE);
    },
};
