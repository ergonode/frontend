/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    get,
    getMetadata,
    getRelation,
    remove,
    update,
} from '@Media/services/index';

export default {
    async getResource({
        dispatch,
        commit,
    }, {
        id,
        onError = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Media/store/media/action/getResource/__before', {
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
                name,
                extension,
                alt,
            } = data;
            const translations = {
                alt: Array.isArray(alt) ? {} : alt,
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name.replace(`.${extension}`, ''),
            });
            commit('__SET_STATE', {
                key: 'extension',
                value: extension,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Media/store/media/action/getResource/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            onError(e);
        }
    },
    async getResourceMetadata({
        state,
    }) {
        const {
            id,
        } = state;

        const metadata = await getMetadata({
            $axios: this.app.$axios,
            id,
        });

        return Object.keys(metadata).reduce((acc, current) => {
            const tmpArray = acc;

            tmpArray.push({
                name: current,
                value: metadata[current].toString(),
            });

            return tmpArray;
        }, []);
    },
    async getResourceRelation({
        state,
    }) {
        const {
            id,
        } = state;

        const relations = await getRelation({
            $axios: this.app.$axios,
            id,
        });

        return relations.filter(row => row.relations.length > 0);
    },
    async updateResource({
        state,
        rootState,
    }, {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
                name,
                extension,
            } = state;
            const {
                translations: {
                    alt,
                },
            } = rootState.tab;
            let data = {
                name: `${name}.${extension}`,
                alt,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Media/store/media/action/updateResource/__before', {
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
            await this.$extendMethods('@Media/store/media/action/updateResource/__after', {
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
    async removeResource({
        state,
    }, {
        onSuccess,
        onError,
    }) {
        try {
            const {
                id,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Media/store/media/action/removeResource/__before', {
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
            await this.$extendMethods('@Media/store/media/action/removeResource/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError(e);
        }
    },
};
