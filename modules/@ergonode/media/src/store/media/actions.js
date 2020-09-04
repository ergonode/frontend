/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    get,
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
            name, extension, alt,
        } = await get({
            $axios: this.app.$axios,
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
    updateResource({
        commit,
        state,
        rootState,
    }, {
        onSuccess,
        onError,
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
