/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    EXTENDS,
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    addBySegment,
    addBySku,
    applyDraft,
    create,
    get,
    getBindings,
    getChildren,
    getCollections,
    getCompleteness,
    getDraft,
    getTemplate,
    remove,
    removeChildren,
    removeDraftValue,
    update,
    updateDraftValue,
} from '@Products/services/index';

import {
    types,
} from './mutations';

export default {
    setDraftValue: ({
        commit,
    }, payload) => commit(types.SET_DRAFT_VALUE, payload),
    setBindingAttributeId: ({
        commit,
    }, payload) => commit(types.SET_BINDING_ATTRIBUTE_ID, payload),
    addBindingAttribute: ({
        commit,
    }) => commit(types.ADD_BINDING_ATTRIBUTE),
    removeBindingAttribute: ({
        commit,
    }, index) => commit(types.REMOVE_BINDING_ATTRIBUTE, index),
    async getProductDraft({
        commit,
    }, {
        id,
        languageCode,
    }) {
        const {
            attributes,
        } = await getDraft({
            $axios: this.app.$axios,
            id,
            languageCode,
        });

        commit(types.SET_PRODUCT_DRAFT, {
            languageCode,
            draft: attributes,
        });
    },
    async getProduct({
        commit,
        dispatch,
        rootState,
    }, id) {
        const {
            productTypes,
        } = rootState.dictionaries;

        const data = await get({
            $axios: this.app.$axios,
            id,
        });

        const {
            design_template_id: templateId,
            attributes,
            sku,
            type,
            status,
            workflow = [],
        } = data;

        if (templateId) {
            commit('__SET_STATE', {
                key: 'template',
                value: templateId,
            });
        }

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
        commit('__SET_STATE', {
            key: 'status',
            value: status,
        });
        commit('__SET_STATE', {
            key: 'workflow',
            value: workflow,
        });
        commit('__SET_STATE', {
            key: 'data',
            value: attributes,
        });

        this.$extendMethods(EXTENDS['@Products/store/product/action/getProduct'], {
            data,
            commit,
            dispatch,
        });

        if (type === PRODUCT_TYPE.WITH_VARIANTS) {
            const [
                bindings,
            ] = await Promise.all([
                getBindings({
                    $axios: this.app.$axios,
                    id,
                }),
                dispatch('getSelectAttributes'),
            ]);

            commit('__SET_STATE', {
                key: 'bindingAttributesIds',
                value: bindings,
            });
        }
    },
    getProductWorkflowOptions({}, {
        id,
        languageCode,
    }) {
        return get({
            $axios: this.app.$axios,
            id,
        }).then(({
            workflow = [],
        }) => workflow.map(e => ({
            id: e.code,
            key: e.code,
            value: e.name,
            hint: e.name
                ? `#${e.code} ${languageCode}`
                : '',
        })));
    },
    async addBySku({
        state,
    }, {
        skus,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;
            const data = {
                skus: skus.replace(/\n/g, ',').split(','),
            };

            await addBySku({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async addBySegment({
        state,
    }, {
        segments,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            const {
                id,
            } = state;
            const data = {
                segments: segments.map(segment => segment.id),
            };

            await addBySegment({
                $axios: this.app.$axios,
                id,
                data,
            });
            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async getProductTemplate({}, {
        languageCode,
        id,
    }) {
        const {
            elements,
        } = await getTemplate({
            $axios: this.app.$axios,
            languageCode,
            id,
        });

        return elements;
    },
    async getProductChildren({}, id) {
        const {
            collection,
        } = await getChildren({
            $axios: this.app.$axios,
            id,
        });

        return collection;
    },
    async getProductBindings({}, id) {
        const bindings = await getBindings({
            $axios: this.app.$axios,
            id,
        });

        return bindings;
    },
    async getProductCollections({
        state,
    }) {
        const {
            id,
        } = state;

        const {
            collection,
        } = await getCollections({
            $axios: this.app.$axios,
            id,
        });

        return collection;
    },
    async getProductCompleteness({}, {
        languageCode,
        id,
    }) {
        const completeness = await getCompleteness({
            $axios: this.app.$axios,
            languageCode,
            id,
        });

        return completeness;
    },
    async updateProductStatus({
        state,
    }, {
        attributeId,
        value,
        onSuccess,
    }) {
        const {
            id,
        } = state;

        const data = {
            value,
        };

        await updateDraftValue({
            $axios: this.app.$axios,
            id,
            attributeId,
            data,
        });
        await applyDraft({
            $axios: this.app.$axios,
            id,
        });

        onSuccess();
    },
    async applyProductDraft({}, {
        id,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            await applyDraft({
                $axios: this.app.$axios,
                id,
            });
            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async updateProductDraft({
        dispatch,
    }, {
        fieldKey,
        productId,
        elementId,
        value,
    }) {
        try {
            const data = {
                value,
            };

            await updateDraftValue({
                $axios: this.app.$axios,
                id: productId,
                attributeId: elementId,
                data,
            });
            dispatch(
                'validations/removeError',
                fieldKey,
                {
                    root: true,
                },
            );
        } catch (e) {
            const {
                code: statusCode, errors,
            } = e.data;

            if (errors) {
                dispatch(
                    'validations/onError',
                    {
                        code: statusCode,
                        errors,
                        fieldKey,
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
                    'validations/onError',
                    {
                        code: statusCode,
                        errors: internalServerError,
                        fieldKey,
                    },
                    {
                        root: true,
                    },
                );
            }
        }
    },
    async getSelectAttributes({
        commit,
        dispatch,
    }) {
        const selectAttributes = await dispatch('attribute/getAttributesByFilter', {
            filter: `type=${TYPES.SELECT}`,
        }, {
            root: true,
        });

        commit('__SET_STATE', {
            key: 'selectAttributes',
            value: selectAttributes,
        });
    },
    async updateProduct(
        {
            state,
            rootState,
        },
        {
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
                template,
                categories,
                type,
                bindingAttributesIds,
            } = state;

            const data = {
                templateId: template,
                categoryIds: categories,
            };

            if (getKeyByValue(productTypes, type) === PRODUCT_TYPE.WITH_VARIANTS) {
                data.bindings = bindingAttributesIds;
            }

            await update({
                $axios: this.app.$axios,
                id,
                data,
            });
            await applyDraft({
                $axios: this.app.$axios,
                id,
            });

            onSuccess();
        } catch (e) {
            onError(e.data);
        }
    },
    async createProduct(
        {
            state,
            rootState,
        },
        {
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
                categories,
                bindingAttributesIds,
            } = state;

            const data = {
                sku,
                type: getKeyByValue(productTypes, type),
                templateId: template,
                categoryIds: categories,
            };

            if (bindingAttributesIds.length) {
                data.bindings = bindingAttributesIds;
            }

            const {
                id,
            } = await create({
                $axios: this.app.$axios,
                data,
            });

            onSuccess(id);
        } catch (e) {
            onError(e.data);
        }
    },
    async removeProduct({
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
    removeProductChildren({
        state,
    }, {
        childrenId,
        skus,
    }) {
        const {
            id,
        } = state;
        const data = {
            skus: skus.replace(/\n/g, ',').split(','),
        };

        return removeChildren({
            $axios: this.app.$axios,
            id,
            childrenId,
            data,
        });
    },
    async removeProductDraft({
        state,
    }, {
        languageCode,
        attributeId,
        onSuccess,
    }) {
        const {
            id,
        } = state;

        await removeDraftValue({
            $axios: this.app.$axios,
            id,
            languageCode,
            attributeId,
        });

        onSuccess();
    },
};
