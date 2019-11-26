/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    getAttributeGroupById(
        { commit, rootState },
        { groupId, onError = () => {} },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/attributes/groups/${groupId}`).then(({
            id,
            code,
            name = '',
        }) => {
            const translations = {
                name,
            };

            commit(types.SET_ID, id);
            commit(types.SET_CODE, code);
            commit(types.SET_NAME, name);

            commit('translations/setTabTranslations', translations, { root: true });
        }).catch(onError);
    },
    createAttributeGroup(
        { commit, rootState },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$post(`${userLanguageCode}/attributes/groups`, data).then(({ id }) => {
            commit(types.SET_ID, id);
            onSuccess(id);
        }).catch((e) => onError(e.data));
    },
    updateAttributeGroup(
        { rootState },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$put(`${userLanguageCode}/attributes/groups/${id}`, data).then(() => onSuccess()).catch((e) => onError(e.data));
    },
    removeAttributeGroup({ state, rootState }, { onSuccess }) {
        const { id } = state;
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/attributes/groups/${id}`).then(() => onSuccess());
    },
    setAttributeGroupCode({ commit }, code) {
        commit(types.SET_CODE, code);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
