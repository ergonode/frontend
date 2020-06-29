/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({
    $axios, $store,
}) {
    const {
        language,
    } = $store.state.authentication.user;
    const {
        id,
    } = $store.state.collections;
    const {
        drafts,
    } = $store.state.grid;
    const requests = Object.keys(drafts).map(
        productId => $axios.$put(
            `${language}/collections/${id}/elements/${productId}`,
            {
                visible: drafts[productId].visible,
            },
        ),
    );

    return Promise.all(requests);
}
