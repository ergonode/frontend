/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getProductStatuses({
        commit, rootState,
    }, params) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$get(`${userLanguageCode}/status`, {
            params,
        }).then(({
            collection: statuses,
        }) => {
            commit('__SET_STATE', {
                key: 'statuses',
                value: statuses.map(status => ({
                    id: status.id,
                    key: status.code,
                    value: status.name,
                    hint: status.name
                        ? `#${status.code} ${userLanguageCode}`
                        : '',
                })),
            });
        });
    },
    getProductStatus({
        commit, dispatch,
    }, path) {
        return this.app.$axios.$get(path).then(({
            id, code, color, name, description,
        }) => {
            const translations = {
                name,
                description,
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'color',
                value: color,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });
        });
    },
    getDefaultStatus({
        commit, state, rootState,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$get(`${userLanguageCode}/workflow/default`).then(({
            default_status: defaultStatus,
        }) => {
            if (defaultStatus === state.code) {
                commit('__SET_STATE', {
                    key: 'isDefaultStatus',
                    value: true,
                });
            }
        });
    },
    updateDefaultStatus({
        state, rootState,
    }) {
        if (state.isDefaultStatus) {
            const {
                language: userLanguageCode,
            } = rootState.authentication.user;

            return this.app.$axios.$put(`${userLanguageCode}/workflow/default/status/${state.id}/default`);
        }
        return null;
    },
    async updateProductStatus({
        state, rootState,
    }, {
        onError,
    }) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            translations: {
                name, description,
            },
        } = rootState.tab;
        const data = {
            color: state.color,
            name,
            description,
        };

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`${userLanguageCode}/status/${state.id}`, data).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeProductStatus({
        commit, state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$delete(`${userLanguageCode}/status/${id}`).then(() => onSuccess());
    },
};
