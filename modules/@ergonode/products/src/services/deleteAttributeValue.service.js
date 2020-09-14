/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default async function ({
    $axios, $store, languageCode, attributeId, productId = null,
}) {
    const id = productId || $store.state.product.id;

    return $axios.$delete(`${languageCode}/products/${id}/draft/${attributeId}/value`, {
        withLanguage: false,
    });
}
