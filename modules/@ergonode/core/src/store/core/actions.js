/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getFlattenedTreeData,
} from '@Core/models/mappers/treeMapper';

import {
    types,
} from './mutations';

export default {
    async getLanguages({
        commit, rootState,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const params = {
            limit: 9999,
            offset: 0,
            view: 'list',
            field: 'name',
            order: 'ASC',
        };
        const {
            collection,
        } = await this.app.$axios.$get(`${userLanguageCode}/languages`, {
            params,
        });

        commit('__SET_STATE', {
            key: 'languages',
            value: collection,
        });
    },
    async getLanguagesTree({
        dispatch, rootState,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            languages,
        } = await this.app.$axios.$get(`${userLanguageCode}/language/tree`);

        dispatch('setLanguagesTree', languages);
    },
    async updateLanguages({
        rootState,
    }, collection) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.app.$axios.$put(`${userLanguageCode}/languages`, {
            collection,
        });
    },
    async updateLanguageTree({
        rootState,
    }, languages) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        await this.app.$axios.$put(`${userLanguageCode}/language/tree`, {
            languages,
        });
    },
    setLanguagesTree({
        state, commit,
    }, treeData) {
        const reducer = (id) => {
            const {
                name = '',
                code,
            } = state.languages.find(e => e.id === id);

            return {
                name,
                code,
            };
        };

        commit('__SET_STATE', {
            key: 'languagesTree',
            value: getFlattenedTreeData({
                treeData,
                mappedId: 'language_id',
                reducer,
            }),
        });
    },
    setDefaultLanguage({
        state, commit, rootState,
    }) {
        const {
            languagePrivileges,
        } = rootState.authentication.user;
        const defaultLanguage = state.languagesTree
            .find(({
                code,
            }) => languagePrivileges[code].read === true);

        commit('__SET_STATE', {
            key: 'defaultLanguageCodeByPrivileges',
            value: defaultLanguage.code,
        });
    },
    setLoader({
        commit,
    }, key) {
        commit(types.SET_LOADER, key);
    },
    removeLoader({
        commit,
    }, key) {
        commit(types.REMOVE_LOADER, key);
    },
    openModal({
        commit,
    }, payload) {
        commit(types.OPEN_MODAL, payload);
    },
    closeModal({
        commit,
    }, key) {
        commit(types.CLOSE_MODAL, key);
    },
};
