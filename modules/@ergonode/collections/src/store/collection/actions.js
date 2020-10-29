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
            onError = () => {},
        },
    ) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Collections/store/collection/action/getCollection/__before', {
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
                code,
                type_id,
                name = {},
                description = {},
            } = data;

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

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Collections/store/collection/action/getCollection/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            onError(e);
        }
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
            let data = {
                typeId: type,
                name,
                description,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Collections/store/collection/action/updateCollection/__before', {
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
            await this.$extendMethods('@Collections/store/collection/action/updateCollection/__after', {
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
            let data = {
                code,
                typeId: type,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Collections/store/collection/action/createCollection/__before', {
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
            await this.$extendMethods('@Collections/store/collection/action/createCollection/__after', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED AFTER METHOD

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
        const errors = {};
        let isAnyError = false;
        const {
            id,
        } = state;
        const mappedSkus = skus.replace(/\n/g, ',');
        const data = {
            skus: mappedSkus !== '' ? mappedSkus.split(',') : [],
        };

        try {
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
                fieldKeys: data.skus.reduce((prev, curr, index) => {
                    const tmp = prev;
                    tmp[`element-${index}`] = curr;
                    return tmp;
                }, {}),
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
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Collections/store/collection/action/removeCollection/__before', {
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
            await this.$extendMethods('@Collections/store/collection/action/removeCollection/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError(e);
        }
    },
};
