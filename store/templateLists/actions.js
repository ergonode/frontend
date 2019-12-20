/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { types } from './mutations';

export default {
    getTemplatesSection({ commit, rootState }, {
        params,
        onError = () => {},
    }) {
        const { language: userLanguageCode } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/templates/groups`).then(({ collection: section }) => {
            commit(types.SET_TEMPLATES_SECTION, section);
            return this.app.$axios.$get(`${userLanguageCode}/templates`, { params }).then(({ collection: elements }) => {
                commit(types.SET_TEMPLATES_SECTION_ELEMENTS, elements);
            }).catch(onError);
        }).catch(onError);
    },
    clearStorage({ commit }) {
        commit(types.CLEAR_STATE);
    },
};
