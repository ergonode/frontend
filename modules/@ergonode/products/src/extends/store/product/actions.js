/* eslint-disable no-throw-literal */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    createBinding,
    getBindings,
    removeBinding,
} from '@Products/extends/services';

import {
    types,
} from './mutations';

export default {
    addBinding: ({
        commit,
    }) => commit(types.ADD_BINDING),
    setBinding: ({
        commit,
    }, payload) => commit(types.SET_BINDING, payload),
    async removeBinding({
        state,
        commit,
    }, index) {
        const {
            id,
            bindings,
        } = state;

        await removeBinding({
            $axios: this.app.$axios,
            productId: id,
            bindingId: bindings[index],
        });
    },
    async getProductBindings({
        commit,
    }, id) {
        const bindings = await getBindings({
            $axios: this.app.$axios,
            id,
        });

        commit('__SET_STATE', {
            key: 'bindings',
            value: bindings,
        });
    },
    async getSelectAttributes({
        commit,
        dispatch,
    }) {
        const selectAttributes = await dispatch('attribute/getAttributesByFilter', {
            filter: 'type=SELECT',
        }, {
            root: true,
        });

        commit('__SET_STATE', {
            key: 'selectAttributes',
            value: selectAttributes,
        });
    },
    async addProductBindings({
        state,
        commit,
    }, {
        scope,
        bindings,
        onSuccess = () => {},
        onError = () => {},
    }) {
        const errors = {};
        let isAnyError = false;

        try {
            const {
                id, bindings: stateBindings,
            } = state;

            const removeBindingRequests = [];
            const createBindingRequests = [];

            stateBindings.forEach((stateBindingId) => {
                if (bindings.indexOf(stateBindingId) === -1) {
                    removeBindingRequests.push(removeBinding({
                        $axios: this.app.$axios,
                        productId: id,
                        bindingId: stateBindingId,
                    }));
                }
            });

            bindings.forEach((bindingId, index) => {
                if (bindingId === null) {
                    errors[`${bindingId}/${index}`] = [
                        'Binding attribute is required',
                    ];
                    isAnyError = true;
                } else if (stateBindings.indexOf(bindingId) === -1) {
                    createBindingRequests.push(createBinding({
                        $axios: this.app.$axios,
                        id,
                        data: {
                            bind_id: bindingId,
                        },
                    }));
                }
            });

            if (isAnyError) {
                throw {
                    data: {
                        errors,
                    },
                };
            }

            await Promise.all([
                ...removeBindingRequests,
                ...createBindingRequests,
            ]);

            commit('__SET_STATE', {
                key: 'bindings',
                value: bindings,
            });

            onSuccess();
        } catch (e) {
            onError({
                errors: e.data.errors,
                scope,
            });
        }
    },
};
