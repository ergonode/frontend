/* eslint-disable no-throw-literal */
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
    },
    {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;
            const {
                drafts,
            } = rootState.grid;
            const {
                language: userLanguageCode,
            } = rootState.authentication.user;

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
                        languageCode: userLanguageCode,
                        data,
                    });
                },
            );

            await Promise.all(requests);

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateCollection(
        {
            state,
            rootState,
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
            } = state;
            const {
                translations: {
                    name,
                    description,
                },
            } = rootState.tab;

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
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createCollection({
        state,
    }, {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
                type,
            } = state;
            const data = {
                code,
                typeId: type,
            };

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
                scope,
            });
        }
    },
    async addBySku({
        state,
    }, {
        scope,
        skus,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const errors = {};
            let isAnyError = false;
            const {
                id,
            } = state;
            const mappedSkus = skus.replace(/\n/g, ',');
            const data = {
                skus: mappedSkus !== '' ? mappedSkus.split(',') : [],
            };

            if (!mappedSkus.length) {
                errors.skus = [
                    'Sku is required',
                ];
                isAnyError = true;
            }

            if (isAnyError) {
                throw {
                    data: {
                        errors,
                    },
                };
            }

            await addBySku({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async addBySegment({
        state,
    }, {
        scope,
        segments,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const errors = {};
            let isAnyError = false;
            const {
                id,
            } = state;
            const data = {
                segments: segments.map(segment => segment.id),
            };

            if (!data.segments.length) {
                errors.segments = [
                    'Segment rule is required',
                ];
                isAnyError = true;
            }

            if (isAnyError) {
                throw {
                    data: {
                        errors,
                    },
                };
            }
            await addBySegment({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
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
