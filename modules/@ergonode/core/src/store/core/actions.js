/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getMappedTree,
} from '@Core/models/mappers/treeDesignerMapper';
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
    }, {
        onError = () => {},
    }) {
        try {
            const {
                collection,
            } = await getAllLanguages({
                $axios: this.app.$axios,
            });

            commit('__SET_STATE', {
                key: 'languages',
                value: collection,
            });
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }
            onError(e);
        }
    },
    async getLanguageTree({
        dispatch,
    }, {
        onError = () => {},
    }) {
        try {
            const {
                languages,
            } = await getLanguageTree({
                $axios: this.app.$axios,
            });

            dispatch('setLanguageTree', languages);
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
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
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Updating languages has been canceled',
                });

                return;
            }

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
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: 'Updating languages tree has been canceled',
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    setLanguageTree({
        state, commit,
    }, languages) {
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

        const languageInheritanceTree = getMappedTree({
            data: [
                languages,
            ],
            childrenId: 'language_id',
            reducer,
        });

        commit('__SET_STATE', {
            key: 'inheritedLanguagesTree',
            value: languageInheritanceTree,
        });
    },
    setDefaultLanguage({
        state, commit, rootState,
    }) {
        if (rootState.authentication.user) {
            const {
                languagePrivileges,
            } = rootState.authentication.user;
            const defaultLanguage = state.inheritedLanguagesTree
                .find(({
                    code,
                }) => languagePrivileges[code].read === true);

            commit('__SET_STATE', {
                key: 'defaultLanguageCode',
                value: defaultLanguage.code,
            });
        }
    },
    addModal({
        commit,
    }, payload) {
        commit(types.ADD_MODAL, payload);
    },
    removeModal({
        commit,
    }, index) {
        commit(types.REMOVE_MODAL, index);
    },
};
