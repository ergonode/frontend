/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject, getKeyByValue } from '@Core/models/objectWrapper';

export default async function ({ $axios, $store }) {
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
    };

    if (bindingAttributesIds.length) {
        data.bindings = bindingAttributesIds;
    }

    if (selectedCategories.length > 0) {
        data.categoryIds = selectedCategories.map(category => category.id);
    }

    const { id } = await $axios.$post(`${language}/products`, data);

    return { id };
}
