/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';

export default async function ({
    $axios, $store,
}) {
    const {
        productTypes,
    } = $store.state.dictionaries;
    const {
        sku,
        type,
        template,
        categories,
        bindingAttributesIds,
    } = $store.state.product;
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
    } = await $axios.$post('products', data);

    return {
        id,
    };
}
