/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    create,
    get,
    getAll,
    getWorkflowByDefaultId,
    remove,
    update,
    updateWorkflowDefaultStatus,
} from '@Statuses/services/index';

export default {
    async getProductStatuses({
        commit,
        rootState,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                language: userLanguageCode,
            } = rootState.authentication.user;
            const {
                collection,
            } = await getAll({
                $axios: this.app.$axios,
            });

            commit('__SET_STATE', {
                key: 'statuses',
                value: collection.map(status => ({
                    id: status.id,
                    key: status.code,
                    value: status.name,
                    hint: status.name
                        ? `#${status.code} ${userLanguageCode}`
                        : '',
                })),
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getProductStatus({
        commit,
        dispatch,
    }, {
        id,
        onError = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Statuses/store/productStatus/action/getProductStatus/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const {
                default_id: workflowDefaultStatus,
            } = await getWorkflowByDefaultId({
                $axios: this.app.$axios,
            });
            const data = await get({
                $axios: this.app.$axios,
                id,
            });
            const {
                code,
                color,
                name,
                description,
            } = data;

            const translations = {
                name,
                description,
            };

            dispatch('__clearStorage');
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'color',
                value: color,
            });
            commit('__SET_STATE', {
                key: 'isDefaultStatus',
                value: workflowDefaultStatus === id,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Statuses/store/productStatus/action/getProductStatus/__after', {
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
    async updateProductStatus({
        state,
        rootState,
    }, {
        scope,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                translations: {
                    name, description,
                },
            } = rootState.tab;
            const {
                id,
                color,
                isDefaultStatus,
            } = state;
            let data = {
                color,
                name,
                description,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Statuses/store/productStatus/action/updateProductStatus/__before', {
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

            const requests = [
                update({
                    $axios: this.app.$axios,
                    id,
                    data,
                }),
            ];

            if (isDefaultStatus) {
                requests.push(updateWorkflowDefaultStatus({
                    $axios: this.app.$axios,
                    id,
                }));
            }

            await Promise.all(requests);

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Statuses/store/productStatus/action/updateProductStatus/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Statuses.productStatus.store.action.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createProductStatus(
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
                code,
                color,
            } = state;
            let data = {
                code,
                color,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Statuses/store/productStatus/action/createProductStatus/__before', {
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
            await this.$getExtendMethod('@Statuses/store/productStatus/action/createProductStatus/__after', {
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
                    message: this.app.i18n.t('@Statuses.productStatus.store.action.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeProductStatus({
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
            await this.$getExtendMethod('@Statuses/store/productStatus/action/removeProductStatus/__before', {
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
            await this.$getExtendMethod('@Statuses/store/productStatus/action/removeProductStatus/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Statuses.productStatus.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
