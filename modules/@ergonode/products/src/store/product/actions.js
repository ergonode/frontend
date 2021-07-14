/* eslint-disable no-throw-literal */
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    deepClone,
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    addBySegment,
    addBySku,
    create,
    get,
    getCollections,
    getCompleteness,
    getInherited,
    getTemplate,
    getWorkflow,
    remove,
    removeChildren,
    removeValues,
    update,
    updateValues,
} from '@Products/services/index';

import {
    types,
} from './mutations';

export default {
    setDraftValue: ({
        commit,
    }, payload) => commit(types.SET_DRAFT_VALUE, payload),
    async getProductWorkflow({
        state,
        commit,
    }, {
        id,
        languageCode,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                status = {},
                workflow = [],
            } = await getWorkflow({
                $axios: this.app.$axios,
                id,
                languageCode,
            });

            commit('__SET_STATE', {
                key: 'status',
                value: status,
            });

            commit('__SET_STATE', {
                key: 'workflow',
                value: {
                    ...state.workflow,
                    [languageCode]: {
                        currentStatus: status,
                        statuses: workflow,
                    },
                },
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getProduct({
        commit,
        rootState,
        dispatch,
    }, {
        id,
        onError = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Products/store/product/action/getProduct/__before', {
                $this: this,
                data: {
                    id,
                },
            });
            // EXTENDED BEFORE METHOD

            const {
                productTypes,
            } = rootState.dictionaries;

            const data = await get({
                $axios: this.app.$axios,
                id,
            });

            dispatch('__clearStorage');

            const {
                sku,
                type,
            } = data;

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'sku',
                value: sku,
            });
            commit('__SET_STATE', {
                key: 'type',
                value: productTypes[type],
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Products/store/product/action/getProduct/__after', {
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
    async getInheritedProduct({
        state,
        commit,
    }, {
        id,
        languageCode,
        onError = () => {},
    }) {
        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Products/store/product/action/getInheritedProduct/__before', {
                $this: this,
                data: {
                    id,
                    languageCode,
                },
            });
            // EXTENDED BEFORE METHOD

            const data = await getInherited({
                $axios: this.app.$axios,
                id,
                languageCode,
            });

            const {
                attributes,
            } = data;

            commit('__SET_STATE', {
                key: 'drafts',
                value: {
                    ...state.drafts,
                    [languageCode]: attributes,
                },
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Products/store/product/action/getInheritedProduct/__after', {
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
    async getProductWorkflowOptions({}, {
        id,
        languageCode,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                workflow = [],
            } = await getWorkflow({
                $axios: this.app.$axios,
                id,
                languageCode,
            });

            onSuccess({
                workflow: workflow.map(e => ({
                    id: e.id,
                    key: e.code,
                    value: e.name,
                    hint: e.name
                        ? `#${e.code} ${languageCode}`
                        : '',
                })),
            });
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async addByList({
        state,
    }, {
        scope,
        skus,
        onSuccess = () => {},
        onError = () => {},
    }) {
        const {
            id,
        } = state;
        const data = {
            skus,
        };

        try {
            await addBySku({
                $axios: this.app.$axios,
                id,
                data,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.addBySKU'),
                });

                return;
            }

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
                    this.app.i18n.t('@Products.product.store.action.skuRequiredLabel'),
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
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.addBySKUToCollectionCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
                fieldKeys: data.skus.reduce((prev, curr, index) => ({
                    ...prev,
                    [`element-${index}`]: curr,
                }), {}),
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
                segments,
            };

            if (!data.segments.length) {
                errors.segments = [
                    this.app.i18n.t('@Products.product.store.action.segmentRequiredLabel'),
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
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.addFromSegmentCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async getProductTemplate({
        state,
        commit,
    }, {
        languageCode,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                elements,
            } = await getTemplate({
                $axios: this.app.$axios,
                languageCode,
                id: state.id,
            });

            commit('__SET_STATE', {
                key: 'templates',
                value: {
                    ...state.templates,
                    [languageCode]: elements,
                },
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getProductCollections({
        state,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;

            const {
                collection,
            } = await getCollections({
                $axios: this.app.$axios,
                id,
            });
            onSuccess({
                collections: collection,
            });
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async getProductCompleteness({
        state,
        commit,
    }, {
        languageCode,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const completeness = await getCompleteness({
                $axios: this.app.$axios,
                languageCode,
                id: state.id,
            });

            commit('__SET_STATE', {
                key: 'completeness',
                value: {
                    ...state.completeness,
                    [languageCode]: completeness,
                },
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
    async updateProductStatus({
        state,
        dispatch,
    }, {
        attributeId,
        value,
        languageCode,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;

            await dispatch(
                'attribute/validateAttributeValue',
                {
                    id: attributeId,
                    languageCode,
                    value,
                    productId: id,
                },
                {
                    root: true,
                },
            );

            const productStatusData = [
                {
                    id,
                    payload: [
                        {
                            id: attributeId,
                            values: [
                                {
                                    language: languageCode,
                                    value,
                                },
                            ],
                        },
                    ],
                },
            ];

            await updateValues({
                $axios: this.app.$axios,
                data: {
                    data: productStatusData,
                },
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.updateCancel'),
                });

                return;
            }

            onError(e);
        }
    },
    async updateProductsValues({
        rootState,
    }, {
        scope,
        drafts,
        columns,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const errors = rootState.feedback.errors[scope] || {};
            const data = [];
            const cachedProducts = {};
            const cachedAttributes = {};
            const cachedElementIds = {};

            Object.keys(drafts).forEach((key) => {
                if (typeof errors[key] === 'undefined') {
                    const [
                        rowId,
                        columnId,
                    ] = key.split('/');
                    const [
                        attributeCode,
                        languageCode,
                    ] = columnId.split(':');

                    if (!cachedElementIds[columnId]) {
                        const {
                            element_id,
                        } = columns.find(column => column.id === columnId);

                        cachedElementIds[columnId] = element_id;
                    }

                    if (typeof cachedProducts[rowId] === 'undefined') {
                        cachedProducts[rowId] = data.length;
                        data[data.length] = {
                            id: rowId,
                            payload: [],
                        };
                    }

                    const index = cachedProducts[rowId];

                    if (typeof cachedAttributes[`${rowId}/${attributeCode}`] === 'undefined') {
                        cachedAttributes[`${rowId}/${attributeCode}`] = data[index].payload.length;

                        data[index].payload.push({
                            id: cachedElementIds[columnId] || attributeCode,
                            values: [],
                        });
                    }

                    const attributeIndex = cachedAttributes[`${rowId}/${attributeCode}`];

                    data[index].payload[attributeIndex].values.push({
                        language: languageCode,
                        value: drafts[key],
                    });
                }
            });

            await updateValues({
                $axios: this.app.$axios,
                data: {
                    data,
                },
            });
            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.applyDraftCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async updateProductValues({
        state,
        commit,
        rootState,
    }, {
        scope,
        attributes,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
                drafts,
            } = state;
            const data = [
                {
                    id,
                    payload: [],
                },
            ];

            const cachedAttributes = {};
            const localDrafts = deepClone(drafts);
            const changeValues = rootState.feedback.changeValues[scope] || {};
            const errors = rootState.feedback.errors[scope] || {};

            Object.keys(changeValues).forEach((key) => {
                const [
                    code,
                    languageCode,
                ] = key.split('/');

                if (key !== 'saved' && typeof errors[key] === 'undefined') {
                    const attributeId = attributes[code];

                    if (typeof cachedAttributes[attributeId] === 'undefined') {
                        cachedAttributes[attributeId] = data[0].payload.length;

                        data[0].payload.push({
                            id: attributeId,
                            values: [],
                        });
                    }

                    data[0].payload[cachedAttributes[attributeId]].values.push({
                        language: languageCode,
                        value: changeValues[key],
                    });

                    localDrafts[languageCode][code] = changeValues[key];
                }
            });

            await updateValues({
                $axios: this.app.$axios,
                data: {
                    data,
                },
            });

            commit('__SET_STATE', {
                key: 'drafts',
                value: {
                    ...state.drafts,
                    ...localDrafts,
                },
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.applyDraftCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async validateProduct({
        state,
        dispatch,
        rootState,
    }, {
        languageCode,
        fieldKey,
        elementId,
        productId = null,
        value,
        scope,
    }) {
        try {
            await dispatch(
                'attribute/validateAttributeValue',
                {
                    id: elementId,
                    languageCode,
                    value,
                    productId: productId || state.id,
                    onError: (errors) => {
                        throw errors;
                    },
                },
                {
                    root: true,
                },
            );

            if (rootState.feedback.errors[scope]) {
                dispatch(
                    'feedback/removeScopeError',
                    {
                        scope,
                        fieldKey,
                    },
                    {
                        root: true,
                    },
                );
            }
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.updateDraftCancel'),
                });

                return;
            }

            const {
                errors,
            } = e.data;

            const fieldKeys = {
                value: fieldKey,
            };

            if (errors) {
                dispatch(
                    'feedback/onError',
                    {
                        errors,
                        fieldKeys,
                        scope,
                    },
                    {
                        root: true,
                    },
                );
            } else {
                const internalServerError = {
                    value: [
                        e.statusText,
                    ],
                };

                dispatch(
                    'feedback/onError',
                    {
                        errors: internalServerError,
                        fieldKeys,
                        scope,
                    },
                    {
                        root: true,
                    },
                );
            }
        }
    },
    async updateProduct(
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
                productTypes,
            } = rootState.dictionaries;
            const {
                id,
                type,
            } = state;
            const typeKey = getKeyByValue(productTypes, type);
            let data = {};

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Products/store/product/action/updateProduct/__before', {
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
            await this.$getExtendMethod('@Products/store/product/action/updateProduct/__after', {
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
                    message: this.app.i18n.t('@Products.product.store.action.updateCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async createProduct(
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
                productTypes,
            } = rootState.dictionaries;
            const {
                sku,
                type,
                template,
            } = state;
            const typeKey = getKeyByValue(productTypes, type);
            let data = {
                sku,
                type: typeKey,
                templateId: template,
            };

            // EXTENDED BEFORE METHOD
            const extendedData = await this.$getExtendMethod('@Products/store/product/action/createProduct/__before', {
                $this: this,
                type: typeKey,
                data,
            });
            // EXTENDED BEFORE METHOD

            extendedData.forEach((extend) => {
                data = {
                    ...data,
                    ...extend,
                };
            });

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Products/store/product/action/createProduct/__after', {
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
                    message: this.app.i18n.t('@Products.product.store.action.createCancel'),
                });

                return;
            }

            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
    async removeProduct({
        state,
        rootState,
    }, {
        onSuccess = () => {},
        onError = () => {},
    }) {
        const {
            productTypes,
        } = rootState.dictionaries;
        const {
            id,
            type,
        } = state;
        const typeKey = getKeyByValue(productTypes, type);

        try {
            // EXTENDED BEFORE METHOD
            await this.$getExtendMethod('@Products/store/product/action/removeProduct/__before', {
                $this: this,
                type: typeKey,
            });
            // EXTENDED BEFORE METHOD

            await remove({
                $axios: this.app.$axios,
                id,
            });

            // EXTENDED AFTER METHOD
            await this.$getExtendMethod('@Products/store/product/action/removeProduct/__after', {
                $this: this,
                type: typeKey,
            });
            // EXTENDED AFTER METHOD

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.deleteCancel'),
                });

                return;
            }

            onError(e);
        }
    },
    async removeProductChildren({
        state,
    }, {
        childrenId,
        skus,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;
            const mappedSkus = skus.replace(/\n/g, ',');
            const data = {
                skus: mappedSkus !== '' ? mappedSkus.split(',') : [],
            };

            await removeChildren({
                $axios: this.app.$axios,
                id,
                childrenId,
                data,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.deleteChildrenCancel'),
                });

                return;
            }

            onError(e);
        }
    },
    async removeProductValues({
        state,
    }, {
        languageCode,
        attributes,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;
            const data = [
                {
                    id,
                    payload: [],
                },
            ];

            attributes.forEach((attribute) => {
                data[0].payload.push({
                    id: attribute.id,
                    languages: [
                        languageCode,
                    ],
                });
            });

            await removeValues({
                $axios: this.app.$axios,
                data: {
                    data: {
                        data,
                    },
                },
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                this.app.$addAlert({
                    type: ALERT_TYPE.WARNING,
                    message: this.app.i18n.t('@Products.product.store.action.deleteDraftCancel'),
                });

                return;
            }

            onError(e);
        }
    },
};
