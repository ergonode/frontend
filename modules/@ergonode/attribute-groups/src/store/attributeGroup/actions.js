/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    remove,
    update,
} from '@AttributeGroups/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';

export default {
    async createAttributeGroup({
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
            const extendedData = await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/createAttributeGroup/__before', {
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
            await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/createAttributeGroup/__after', {
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
                    message: this.app.i18n.t('@AttributeGroups.attributeGroup.store.action.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async getAttributeGroup(
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
            await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/getAttributeGroup/__before', {
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

            const translations = {
                name,
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
                key: 'name',
                value: name,
            });

            dispatch('tab/setTranslations', translations, {
                root: true,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/getAttributeGroup/__after', {
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
    async updateAttributeGroup(
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
            const extendedData = await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/updateAttributeGroup/__before', {
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
            await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/updateAttributeGroup/__after', {
                $this: this,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@AttributeGroups.attributeGroup.store.action.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeAttributeGroup({
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
            await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/removeAttributeGroup/__before', {
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
            await this.$getExtendMethod('@AttributeGroups/store/attributeGroup/action/removeAttributeGroup/__after', {
                $this: this,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@AttributeGroups.attributeGroup.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
