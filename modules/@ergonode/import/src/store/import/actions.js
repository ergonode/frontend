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
    create,
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
            onError,
        },
    ) {
        try {
            const {
                sources,
            } = rootState.dictionaries;

            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Import/store/import/action/getImportProfile/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const data = await get({
                $axios: this.app.$axios,
                id,
            });
            const {
                type,
                ...rest
            } = data;

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

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Import/store/import/action/getImportProfile/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            onError(e);
        }
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
    async updateImportProfile(
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
            const extendedData = await this.$extendMethods('@Import/store/import/action/updateImportProfile/__before', {
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
            await this.$extendMethods('@Import/store/import/action/updateImportProfile/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createImportProfile({
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
                sources,
            } = rootState.dictionaries;
            const typeId = getKeyByValue(sources, type);

            let data = {
                type: typeId,
            };

            if (configuration) {
                data = {
                    ...data,
                    ...JSON.parse(configuration),
                };
            }

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Import/store/import/action/createImportProfile/__before', {
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

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Import/store/import/action/createImportProfile/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });

            onSuccess(id);
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeImport({
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
            await this.$extendMethods('@Import/store/import/action/removeImport/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Import/store/import/action/removeImport/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError(e);
        }
    },
};
