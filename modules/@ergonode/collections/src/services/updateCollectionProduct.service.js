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
    } = $store.state.collection;
    const {
        drafts,
    } = $store.state.grid;
    const requests = Object.keys(drafts).map(
        (key) => {
            const [
                productId,
            ] = key.split('/');

            return $axios.$put(
                `${language}/collections/${id}/elements/${productId}`,
                {
                    visible: drafts[key],
                },
            );
        },
    );

    return Promise.all(requests);
}
