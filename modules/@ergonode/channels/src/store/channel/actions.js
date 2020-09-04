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
    async getConfiguration(
        {
            commit,
            state,
            rootState,
        },
    ) {
        const {
            id,
            type,
        } = state;
        const {
            channels,
        } = rootState.dictionaries;
        const configuration = await this.app.$axios.$get(`channels/${getKeyByValue(channels, type)}/configuration`);

        if (!id) {
            const defaultConfiguration = getDefaultJsonSchemaTypes(configuration.properties);

            commit('__SET_STATE', {
                key: 'configuration',
                value: JSON.stringify(defaultConfiguration),
            });
        }

        return configuration;
    },
    async getSchedulerConfiguration(
        {
            commit, state,
        },
    ) {
        const {
            id,
        } = state;
        const scheduler = await this.app.$axios.$get(`channels/${id}/scheduler`);

        if (scheduler) {
            commit('__SET_STATE', {
                key: 'scheduler',
                value: JSON.stringify(scheduler),
            });
        }
    },
    getChannel(
        {
            commit, rootState,
        },
        {
            id, onError = () => {},
        },
    ) {
        const {
            channels,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`channels/${id}`).then(({
            id: channelId,
            type,
            ...rest
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: channelId,
            });
            commit('__SET_STATE', {
                key: 'type',
                value: channels[type],
            });
            commit('__SET_STATE', {
                key: 'configuration',
                value: JSON.stringify(rest),
            });
        }).catch(onError);
    },
    createExport({
        state,
    }, {
        onSuccess,
        onError,
    }) {
        const {
            id,
        } = state;

        return this.app.$axios.$post(`channels/${id}/exports`).then(data => onSuccess(data)).catch(e => onError(e.data));
    },
    updateChannel(
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
        return this.app.$axios.$put(`channels/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    updateScheduler(
        {
            state,
        },
        {
            data,
            onSuccess,
            onError,
        },
    ) {
        const {
            id,
        } = state;
        return this.app.$axios.$put(`channels/${id}/scheduler`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeChannel({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return this.app.$axios.$delete(`channels/${id}`).then(() => onSuccess());
    },
};
