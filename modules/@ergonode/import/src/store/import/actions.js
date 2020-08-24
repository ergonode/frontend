/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getDefaultJsonSchemaTypes,
} from '@Core/models/jsonSchema';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';

export default {
    getImportProfile(
        {
            commit, rootState,
        },
        {
            id, onError = () => {},
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            sources,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/sources/${id}`).then(({
            type,
            ...rest
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'type',
                value: sources[type],
            });
            commit('__SET_STATE', {
                key: 'configuration',
                value: JSON.stringify(rest),
            });
        }).catch(onError);
    },
    async getConfiguration({
        commit,
        state,
        rootState,
    }) {
        const {
            id,
            type,
        } = state;
        const {
            sources,
        } = rootState.dictionaries;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const configuration = await this.app.$axios.$get(`${userLanguageCode}/sources/${getKeyByValue(sources, type)}/configuration`);

        if (!id) {
            const defaultConfiguration = getDefaultJsonSchemaTypes(configuration.properties);

            commit('__SET_STATE', {
                key: 'configuration',
                value: JSON.stringify(defaultConfiguration),
            });
        }

        return configuration;
    },
    updateImportProfile(
        {
            rootState,
        },
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        return this.app.$axios.$put(`${rootState.authentication.user.language}/sources/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeImport({
        state,
        rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/sources/${id}`).then(() => onSuccess());
    },
};
