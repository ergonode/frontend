/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    addBySegment,
    addBySku,
    create,
    get,
    getTypes,
    remove,
    update,
    updateDraftValue,
} from '@Collections/services/index';

export default {
    async getCollection(
        {
            commit,
            dispatch,
        },
        {
            id,
        },
    ) {
        const {
            code,
            type_id,
            name = {},
            description = {},
        } = await get({
            $axios: this.app.$axios,
            id,
        });

        const translations = {
            name,
            description,
        };

        commit('__SET_STATE', {
            key: 'id',
            value: id,
        });
        commit('__SET_STATE', {
            key: 'code',
            value: code,
        });
        commit('__SET_STATE', {
            key: 'type',
            value: type_id,
        });

        dispatch('tab/setTranslations', translations, {
            root: true,
        });
    },
    getCollectionTypeOptions({
        rootState,
    }) {
        const {
            language,
        } = rootState.authentication.user;

        return getTypes({
            $axios: this.app.$axios,
        }).then(({
            collection,
        }) => ({
            options: collection.map(element => ({
                id: element.id,
                key: element.code,
                value: element.name,
                hint: element.name ? `#${element.code} ${language}` : '',
            })),
        }));
    },
    async updateCollectionProductsVisibility({
        state,
        rootState,
    }) {
        const {
            id,
        } = state;
        const {
            drafts,
        } = rootState.grid;

        const requests = Object.keys(drafts).map(
            async (key) => {
                const [
                    productId,
                ] = key.split('/');

                const data = {
                    visible: drafts[key],
                };

                await updateDraftValue({
                    $axios: this.app.$axios,
                    id,
                    productId,
                    data,
                });
            },
        );

        await Promise.all(requests);
    },
    async updateCollection(
        {
            state,
            rooState,
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
                translations: {
                    name,
                    description,
                },
            } = rooState.tab;

            const data = {
                typeId: type,
                name,
                description,
            };

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async createCollection({
        state,
    }, {
        onSuccess,
    }) {
        const {
            code,
            type,
        } = state;
        const data = {
            code,
            typeId: type,
        };

        await create({
            $axios: this.app.$axios,
            data,
        });
        onSuccess();
    },
    addBySku({
        state,
    }, {
        skus,
    }) {
        const {
            id,
        } = state;
        const data = {
            skus: skus.replace(/\n/g, ',').split(','),
        };

        return addBySku({
            $axios: this.app.$axios,
            id,
            data,
        });
    },
    addBySegment({
        state,
    }, {
        segments,
    }) {
        const {
            id,
        } = state;
        const data = {
            segments: segments.map(segment => segment.id),
        };

        return addBySegment({
            $axios: this.app.$axios,
            id,
            data,
        });
    },
    async removeCollection({
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
