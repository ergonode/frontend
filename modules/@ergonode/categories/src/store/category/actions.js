/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    remove,
    update,
} from '@Categories/services/index';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';

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
            const extendedData = await this.$getExtendMethod('@Categories/store/category/action/createCategory/__before', {
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
            await this.$getExtendMethod('@Categories/store/category/action/createCategory/__after', {
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
                    message: this.app.i18n.t('@Categories.category.store.action.createCancel'),
                });

                return;
            }

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
            await this.$getExtendMethod('@Categories/store/category/action/getCategory/__before', {
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

            dispatch('__clearStorage');

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
            await this.$getExtendMethod('@Categories/store/category/action/getCategory/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
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
            const extendedData = await this.$getExtendMethod('@Categories/store/category/action/updateCategory/__before', {
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
            await this.$getExtendMethod('@Categories/store/category/action/updateCategory/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Categories.category.store.action.updateCancel'),
                });

                return;
            }

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
        try {
            const {
                id,
            } = state;

            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Categories/store/category/action/removeCategory/__before', {
                $this: this,
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Categories/store/category/action/removeCategory/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Categories.category.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
