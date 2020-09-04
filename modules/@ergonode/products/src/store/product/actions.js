/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    EXTENDS,
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    applyDraft,
    create,
    get,
    getBindings,
    getDraft,
    remove,
    update,
    updateDraft,
} from '@Products/services/index';

import {
    types,
} from './mutations';

const getAttributesByFilter = () => import('@Attributes/services/getAttributesByFilter.service');

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
        languageCode, id,
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

        await updateDraft({
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
    getSelectAttributes({
        commit,
    }) {
        return getAttributesByFilter().then(
            response => response.default({
                $axios: this.app.$axios,
                $store: this,
                filter: `type=${TYPES.SELECT}`,
            }).then((selectAttributes) => {
                commit('__SET_STATE', {
                    key: 'selectAttributes',
                    value: selectAttributes,
                });
            }),
        );
    },
    async updateProduct(
        {
            dispatch,
        },
        {
            id,
            data,
            onSuccess = () => {},
        },
    ) {
        await this.app.$axios.$put(`products/${id}`, data).then(onSuccess).catch(e => dispatch('validations/onError', e.data, {
            root: true,
        }));
    },
    removeProduct({
        state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;

        return this.app.$axios.$delete(`products/${id}`).then(() => onSuccess());
    },
};
