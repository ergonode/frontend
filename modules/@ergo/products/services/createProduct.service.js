/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject, getKeyByValue } from '@Core/models/objectWrapper';

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { productTypes } = $store.state.dictionaries;
    const {
        sku,
        type,
        template,
        selectedCategories,
        bindingAttributesIds,
    } = $store.state.product;
    const data = {
        sku,
        type: getKeyByValue(productTypes, type),
        templateId: isObject(template) ? template.id : null,
        bindings: bindingAttributesIds,
    };

    if (selectedCategories.length > 0) {
        data.categoryIds = selectedCategories.map(category => category.id);
    }

    return $axios.$post(`${language}/products`, data);
}
