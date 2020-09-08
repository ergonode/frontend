/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({
    $axios, $store,
}) {
    const {
        name, symbol,
    } = $store.state.unit;

    return $axios.$post('units', {
        name,
        symbol,
    });
}
