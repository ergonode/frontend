/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    getAll,
    remove,
    update,
} from '@Categories/services/index';

export default {
    async createCategory({
        state,
    },
    {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                code,
            } = state;
            let data = {
                code,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Categories/store/category/action/createCategory/__before', {
                $this: this,
                data,
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extended) => {
                data = {
                    ...data,
                    ...extended,
                };
            });
            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Categories/store/category/action/createCategory/__after', {
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
    async getCategory(
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
            await this.$extendMethods('@Categories/store/category/action/getCategory/__before', {
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
                name = '',
            } = data;

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });

            dispatch('tab/setTranslations', {
                name,
            }, {
                root: true,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Categories/store/category/action/getCategory/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            onError(e);
        }
    },
    getCategoriesOptions({
        rootState,
    }) {
        const {
            language,
        } = rootState.authentication.user;

        return getAll({
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
    async updateCategory(
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
            } = state;
            const {
                translations: {
                    name,
                },
            } = rootState.tab;
            let data = {
                name,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$extendMethods('@Categories/store/category/action/updateCategory/__before', {
                $this: this,
                data: {
                    id,
                    ...data,
                },
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Categories/store/category/action/updateCategory/__after', {
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
    async removeCategory({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        const {
            id,
        } = state;

        try {
            // EXTENDED BEFORE METHOD
            await this.$extendMethods('@Categories/store/category/action/removeCategory/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$extendMethods('@Categories/store/category/action/removeCategory/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            onError(e);
        }
    },
};
