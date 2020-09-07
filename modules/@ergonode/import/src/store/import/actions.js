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
import {
    get,
    getConfiguration,
    getDetails,
    remove,
    update,
} from '@Import/services/index';

export default {
    async getImportProfile(
        {
            commit, rootState,
        },
        {
            id,
        },
    ) {
        const {
            sources,
        } = rootState.dictionaries;

        const {
            type,
            ...rest
        } = await get({
            $axios: this.app.$axios,
            id,
        });

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
    },
    async getImportDetails({}, {
        sourceId,
        importId,
    }) {
        const details = await getDetails({
            $axios: this.app.$axios,
            sourceId,
            importId,
        });

        return [
            {
                label: 'Date of start',
                value: details.started_at,
            },
            {
                label: 'Status',
                value: details.status,
            },
            {
                label: 'Records',
                value: details.records || '0',
            },
            {
                label: 'Errors',
                value: details.errors || '0',
            },
        ];
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
        const configuration = await getConfiguration({
            $axios: this.app.$axios,
            id: getKeyByValue(sources, type),
        });

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
            state,
        },
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                type,
                configuration,
            } = state;
            const data = {
                type,
                ...JSON.parse(configuration),
            };

            update({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async removeImport({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        await remove({
            $axios: this.app.$axios,
            id,
        });
        onSuccess();
    },
};
