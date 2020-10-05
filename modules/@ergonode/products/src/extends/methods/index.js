/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getBindings,
} from '@Products/extends/services';

export const setBindingAttributes = async ({
    $this, data,
}) => {
    const {
        id,
    } = data;
    const [
        bindings,
    ] = await Promise.all([
        getBindings({
            $axios: $this.app.$axios,
            id,
        }),
        $this.dispatch('product/getSelectAttributes'),
    ]);

    $this.commit('product/__SET_STATE', {
        key: 'bindingAttributesIds',
        value: bindings,
    });
};

export const prepareProductVariantData = async ({
    $this,
}) => {
    const {
        bindingAttributesIds,
    } = $this.state.product;

    return {
        bindings: bindingAttributesIds.length ? bindingAttributesIds : [],
    };
};
