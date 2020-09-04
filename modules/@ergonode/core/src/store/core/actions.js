/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getFlattenedTreeData,
} from '@Core/models/mappers/treeMapper';
import languageService from '@Core/services/language/index';
import languageTreeService from '@Core/services/languageTree/index';

import {
    types,
} from './mutations';

export default {
    async getLanguages({
        commit,
    }) {
        const {
            collection,
        } = await languageService.getAll({
            $axios: this.app.$axios,
        });

        commit('__SET_STATE', {
            key: 'languages',
            value: collection,
        });
    },
    async getLanguageTree({
        dispatch,
    }) {
        const {
            languages,
        } = await languageTreeService.get({
            $axios: this.app.$axios,
        });

        dispatch('setLanguageTree', languages);
    },
    async updateLanguages({}, collection) {
        const data = {
            collection,
        };
        await languageService.update({
            $axios: this.app.$axios,
            data,
        });
    },
    async updateLanguageTree({}, languages) {
        const data = {
            languages,
        };
        await languageTreeService.update({
            $axios: this.app.$axios,
            data,
        });
    },
    setLanguageTree({
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
            key: 'defaultLanguageCode',
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
