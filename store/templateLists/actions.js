/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getTemplatesSection({ commit, rootState }, {
        params,
        onError,
    }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/templates/groups`).then(({ collection: section }) => {
            commit('setTemplatesSection', section);
            return this.app.$axios.$get(`${userLanguageCode}/templates`, { params }).then(({ collection: elements }) => {
                commit('setTemplatesSectionElements', elements);
            }).catch(e => onError(e.data));
        }).catch(e => onError(e.data));
    },
    clearStorage: ({ commit }) => commit('clearStorage'),
};
