/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject } from '@Core/models/objectWrapper';

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { sku, template, selectedCategories } = $store.state.productsDraft;
    const data = {
        sku,
        templateId: isObject(template) ? template.id : null,
    };

    if (selectedCategories.length > 0) {
        data.categoryIds = selectedCategories.map(category => category.id);
    }

    return $axios.$post(`${language}/products`, data);
}
