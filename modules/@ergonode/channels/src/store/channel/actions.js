/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    createExport,
    get,
    getConfiguration,
    getDetails,
    getSchedulerConfiguration,
    remove,
    update,
    updateScheduler,
} from '@Channels/services/index';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
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
        {
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
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

            onSuccess({
                configuration,
            });
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getSchedulerConfiguration({
        commit,
        state,
    }, {
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/getSchedulerConfiguration/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

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
            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/getChannel/__after', {
                $this: this,
                data: scheduler,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getExportDetails({}, {
        channelId,
        exportId,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const details = await getDetails({
                $axios: this.app.$axios,
                channelId,
                exportId,
            });

            onSuccess({
                details: [
                    {
                        label: this.app.i18n.t('@Channels.channel.store.action.dateOfStartLabel'),
                        value: details.started_at,
                    },
                    {
                        label: this.app.i18n.t('@Channels.channel.store.action.dateOfFinishLabel'),
                        value: details.ended_at,
                    },
                    {
                        label: this.app.i18n.t('@Channels.channel.store.action.statusLabel'),
                        value: details.status,
                    },
                    {
                        label: this.app.i18n.t('@Channels.channel.store.action.processedLabel'),
                        value: details.processed || '0',
                    },
                    {
                        label: this.app.i18n.t('@Channels.channel.store.action.errorsLabel'),
                        value: details.errors || '0',
                    },
                ],
                links: details._links,
            });
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getChannel(
        {
            commit,
            dispatch,
            rootState,
        },
        {
            id,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/getChannel/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const {
                channels,
            } = rootState.dictionaries;
            const data = await get({
                $axios: this.app.$axios,
                id,
            });
            const {
                id: channelId,
                type,
                ...rest
            } = data;

            dispatch('__clearStorage');

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

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/getChannel/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError(e);
        }
    },
    async createChannel({
        state,
        rootState,
    }, {
        scope,
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

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Channels/store/channel/action/createChannel/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });
            // EXTENDED BEFORE METHOD

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

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/createChannel/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess(id);
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Channels.channel.store.action.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createChannelExport({
        state,
    }, {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;
            let data = {};

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Channels/store/channel/action/createChannelExport/__before', {
                $this: this,
                data,
            });
            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });
            // EXTENDED BEFORE METHOD

            await createExport({
                $axios: this.app.$axios,
                id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/createChannelExport/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Channels.channel.store.action.createExportCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateChannel(
        {
            state,
        },
        {
            scope,
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
            let data = {
                type,
                ...JSON.parse(configuration),
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Channels/store/channel/action/updateChannel/__before', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/updateChannel/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Channels.channel.store.action.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateScheduler(
        {
            state,
        },
        {
            scope,
            onSuccess = () => {},
            onError = () => {},
        },
    ) {
        try {
            const {
                id,
                scheduler,
            } = state;
            const tmpData = JSON.parse(scheduler);
            let data = removeObjectProperty(tmpData, 'id');

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Channels/store/channel/action/updateScheduler/__before', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });
            // EXTENDED BEFORE METHOD

            await updateScheduler({
                $axios: this.app.$axios,
                id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/updateScheduler/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Channels.channel.store.action.updateSchedulerCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeChannel({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/removeChannel/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Channels/store/channel/action/removeChannel/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Channels.channel.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
