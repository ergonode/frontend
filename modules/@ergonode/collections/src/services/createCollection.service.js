/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({
    $axios, $store,
}) {
    const {
        code, type,
    } = $store.state.collection;

    return $axios.$post('collections', {
        code,
        typeId: type,
    });
}
