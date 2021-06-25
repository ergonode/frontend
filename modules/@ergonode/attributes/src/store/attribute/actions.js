/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
    get,
    getAll,
    remove,
    update,
    validateValue,
} from '@Attributes/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getMappedTranslationArrayOptions,
} from '@Core/models/mappers/translationsMapper';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';

export default {
    async createAttribute({
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
                code,
                type,
                scope: attributeScope,
            } = state;
            const {
                attrTypes,
            } = rootState.dictionaries;
            const typeKey = type ? getKeyByValue(attrTypes, type) : null;
            let data = {
                code,
                scope: attributeScope,
                type: typeKey,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Attributes/store/attribute/action/createAttribute/__before', {
                $this: this,
                type: typeKey,
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
            await this.$getExtendMethod('@Attributes/store/attribute/action/createAttribute/__after', {
                $this: this,
                type: typeKey,
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
                    message: this.app.i18n.t('@Attributes.attribute.store.action.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async getAttributesByFilter({
        rootState,
    }, {
        filter,
    }) {
        try {
            const {
                language,
            } = rootState.authentication.user;

            const {
                collection,
            } = await getAll({
                $axios: this.app.$axios,
                params: {
                    limit: 9999,
                    offset: 0,
                    filter,
                    view: 'list',
                    field: 'name',
                    order: 'ASC',
                },
            });

            return getMappedTranslationArrayOptions({
                options: collection,
                languageCode: language,
            });
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return [];
            }

            return [];
        }
    },
    async getAttribute({
        dispatch,
        commit,
        rootState,
    }, {
        id,
        onError = () => {},
    }) {
        const {
            attrTypes,
        } = rootState.dictionaries;

        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Attributes/store/attribute/action/getAttribute/__before', {
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
                type,
                hint = '',
                label = '',
                scope,
            } = data;
            const translations = {
                hint,
                label,
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
                key: 'scope',
                value: scope,
            });
            commit('__SET_STATE', {
                key: 'type',
                value: attrTypes[type],
            });

            dispatch('tab/setTranslations', translations, {
                root: true,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Attributes/store/attribute/action/getAttribute/__after', {
                $this: this,
                data,
                type,
            });
            // EXTENDED AFTER METHOD
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async updateAttribute(
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
                scope: attributeScope,
            } = state;
            const {
                attrTypes,
            } = rootState.dictionaries;
            const {
                translations: {
                    label, hint,
                },
            } = rootState.tab;
            const typeKey = getKeyByValue(attrTypes, type);
            let data = {
                scope: attributeScope,
                label,
                hint,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Attributes/store/attribute/action/updateAttribute/__before', {
                $this: this,
                type: typeKey,
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
            await this.$getExtendMethod('@Attributes/store/attribute/action/updateAttribute/__after', {
                $this: this,
                type: typeKey,
                data,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Attributes.attribute.store.action.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeAttribute({
        state,
        rootState,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        const {
            id,
            type,
        } = state;
        const {
            attrTypes,
        } = rootState.dictionaries;
        const typeKey = getKeyByValue(attrTypes, type);

        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Attributes/store/attribute/action/removeAttribute/__before', {
                $this: this,
                type: typeKey,
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Attributes/store/attribute/action/removeAttribute/__after', {
                $this: this,
                type: typeKey,
            });
            // EXTENDED AFTER METHOD
            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Attributes.attribute.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
    async validateAttributeValue({
        commit,
    }, {
        id,
        languageCode,
        value,
        productId = null,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            await validateValue({
                $axios: this.app.$axios,
                id,
                languageCode,
                data: {
                    value,
                },
                productId,
            });

            onSuccess(id);
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Attributes.attribute.store.action.validateCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
