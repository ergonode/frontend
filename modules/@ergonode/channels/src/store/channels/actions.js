/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getDefaultJsonSchemaTypes,
} from '@Core/models/jsonSchema';

export default {
    async getConfigurationByType(
        {
            commit, state, rootState,
        },
        {
            typeId,
        },
    ) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const configuration = await this.app.$axios.$get(`${userLanguageCode}/channels/${typeId}/configuration`);

        if (!state.id) {
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
            commit, state, rootState,
        },
    ) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        const scheduler = await this.app.$axios.$get(`${userLanguageCode}/channels/${id}/scheduler`);

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
            language: userLanguageCode,
        } = rootState.authentication.user;
        const {
            channels,
        } = rootState.dictionaries;

        return this.app.$axios.$get(`${userLanguageCode}/channels/${id}`).then(({
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
        state, rootState,
    }, {
        onSuccess,
        onError,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$post(`${userLanguageCode}/channels/${id}/exports`).then(data => onSuccess(data)).catch(e => onError(e.data));
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
        return this.app.$axios.$put(`${rootState.authentication.user.language}/channels/${id}`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    updateScheduler(
        {
            state, rootState,
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
        return this.app.$axios.$put(`${rootState.authentication.user.language}/channels/${id}/scheduler`, data).then(() => onSuccess()).catch(e => onError(e.data));
    },
    removeChannel({
        state, rootState,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        return this.app.$axios.$delete(`${userLanguageCode}/channels/${id}`).then(() => onSuccess());
    },
};
