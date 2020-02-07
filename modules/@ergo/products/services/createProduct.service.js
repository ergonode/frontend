/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { sku, template, selectedCategories } = $store.state.productsDraft;
    const data = { sku, templateId: template.id };

    if (selectedCategories.length > 0) {
        data.categoryIds = selectedCategories.map(category => category.id);
    }

    return $axios.$post(`${language}/products`, data);
}
