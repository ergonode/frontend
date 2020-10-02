/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getBindings,
} from '@Products/extends/services';

import {
    types,
} from './mutations';

export default {
    setBindingAttributeId: ({
        commit,
    }, payload) => commit(types.SET_BINDING_ATTRIBUTE_ID, payload),
    addBindingAttribute: ({
        commit,
    }) => commit(types.ADD_BINDING_ATTRIBUTE),
    removeBindingAttribute: ({
        commit,
    }, index) => commit(types.REMOVE_BINDING_ATTRIBUTE, index),
    async getProductBindings({}, id) {
        const bindings = await getBindings({
            $axios: this.app.$axios,
            id,
        });

        return bindings;
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
};
