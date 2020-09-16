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
    }) {
        const {
            name,
            extension,
            alt,
        } = await get({
            $axios: this.app.$axios,
            id,
        });

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
        commit,
        state,
        rootState,
    }, {
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
            const data = {
                name: `${name}.${extension}`,
                alt,
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
                scope: 'resourceGeneralTab',
            });
        }
    },
    async removeResource({
        state,
        commit,
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
