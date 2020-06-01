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
        initialBindingAttributesIds,
    } = $store.state.product;
    const data = {
        sku,
        type: getKeyByValue(productTypes, type),
        templateId: isObject(template) ? template.id : null,
    };

    if (selectedCategories.length > 0) {
        data.categoryIds = selectedCategories.map(category => category.id);
    }

    const { id } = await $axios.$post(`${language}/products`, data);

    const toAddBindingRequests = bindingAttributesIds
        .filter(bindingId => !initialBindingAttributesIds
            .some(initialBindingId => initialBindingId === bindingId))
        .map(bindingId => $axios.$post(`${language}/products/${id}/binding`, { bind_id: bindingId }));

    const toRemoveBindingRequests = initialBindingAttributesIds
        .filter(initialBindingId => !bindingAttributesIds
            .some(bindingId => bindingId === initialBindingId))
        .map(bindingId => $axios.$delete(`${language}/products/${id}/binding/${bindingId}`));

    await Promise.all([
        ...toAddBindingRequests,
        ...toRemoveBindingRequests,
    ]);

    return { id };
}
