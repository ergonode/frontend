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
            sources,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`sources/${id}`).then(({
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
        const configuration = await this.app.$axios.$get(`sources/${getKeyByValue(sources, type)}/configuration`);

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
        {},
        {
            id,
            data,
            onSuccess,
            onError,
        },
    ) {
        return this.app.$axios.$put(`sources/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeImport({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return this.app.$axios.$delete(`sources/${id}`).then(() => onSuccess());
    },
};
