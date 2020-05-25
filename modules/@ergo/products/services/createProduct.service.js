/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { sku, template, categories } = $store.state.product;
    const data = {
        sku,
        templateId: template,
        categoryIds: categories,
    };

    return $axios.$post(`${language}/products`, data);
}
