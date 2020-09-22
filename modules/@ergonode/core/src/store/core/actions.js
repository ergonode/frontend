/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getFlattenedTreeData,
} from '@Core/models/mappers/treeMapper';
import {
    getAll as getAllLanguages,
    update as updateLanguage,
} from '@Core/services/language/index';
import {
    get as getLanguageTree,
    update as updateLanguageTree,
} from '@Core/services/languageTree/index';

import {
    types,
} from './mutations';

export default {
    async getLanguages({
        commit,
    }) {
        const {
            collection,
        } = await getAllLanguages({
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
        } = await getLanguageTree({
            $axios: this.app.$axios,
        });

        dispatch('setLanguageTree', languages);
    },
    async updateLanguages({}, {
        languages = [],
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const data = {
                collection: languages,
            };

            await updateLanguage({
                $axios: this.app.$axios,
                data,
            });

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateLanguageTree({}, {
        languages,
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const data = {
                languages,
            };

            await updateLanguageTree({
                $axios: this.app.$axios,
                data,
            });

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
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
