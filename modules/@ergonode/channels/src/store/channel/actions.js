/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    getConfiguration,
    getDetails,
    getSchedulerConfiguration,
    remove,
    update,
    updateScheduler,
} from '@Channels/services/index';
import {
    getDefaultJsonSchemaTypes,
} from '@Core/models/jsonSchema';
import {
    getKeyByValue,
    removeObjectProperty,
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
        const configuration = await getConfiguration({
            $axios: this.app.$axios,
            id: getKeyByValue(channels, type),
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
    async getSchedulerConfiguration(
        {
            commit, state,
        },
    ) {
        const {
            id,
        } = state;
        const scheduler = await getSchedulerConfiguration({
            $axios: this.app.$axios,
            id,
        });

        if (scheduler) {
            commit('__SET_STATE', {
                key: 'scheduler',
                value: JSON.stringify(scheduler),
            });
        }
    },
    async getExportDetails({}, {
        channelId,
        exportId,
    }) {
        const details = await getDetails({
            $axios: this.app.$axios,
            channelId,
            exportId,
        });

        return {
            details: [
                {
                    label: 'Date of start',
                    value: details.started_at,
                },
                {
                    label: 'Date of finish',
                    value: details.ended_at,
                },
                {
                    label: 'Status',
                    value: details.status,
                },
                {
                    label: 'Processed',
                    value: details.processed || '0',
                },
                {
                    label: 'Errors',
                    value: details.errors || '0',
                },
            ],
            links: details._links,
        };
    },
    async getChannel(
        {
            commit,
            rootState,
        },
        {
            id,
        },
    ) {
        const {
            channels,
        } = rootState.dictionaries;

        const {
            id: channelId,
            type,
            ...rest
        } = await get({
            $axios: this.app.$axios,
            id,
        });

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
    },
    async createChannel({
        state,
        rootState,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                type,
                configuration,
            } = state;
            const {
                channels,
            } = rootState.dictionaries;
            const typeId = getKeyByValue(channels, type);

            let data = {
                type: typeId,
            };

            if (configuration) {
                data = {
                    ...data,
                    ...JSON.parse(configuration),
                };
            }

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope: 'channelForm',
            });
        }
    },
    async updateChannel(
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

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope: 'channelGeneralTab',
            });
        }
    },
    async updateScheduler(
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
                scheduler,
            } = state;

            const tmp = JSON.parse(scheduler);

            const data = removeObjectProperty(tmp, 'id');

            await updateScheduler({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope: 'schedulerGeneralTab',
            });
        }
    },
    async removeChannel({
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
