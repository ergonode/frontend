/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({
    $axios, $store,
}) {
    const {
        code, color,
    } = $store.state.productStatus;

    return $axios.$post('status', {
        code,
        color,
    });
}
