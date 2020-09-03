/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default async function ({
    $axios, $store, languageCode, elements, productId = null,
}) {
    const id = productId || $store.state.product.id;
    const elementsRequests = [];

    elements.forEach((attributeId) => {
        elementsRequests.push($axios.$delete(`${languageCode}/products/${id}/draft/${attributeId}/value`), {
            withLanguage: false,
        });
    });
    await Promise.all([
        ...elementsRequests,
    ]);
}
