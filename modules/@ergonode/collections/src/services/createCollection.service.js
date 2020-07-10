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
        code, type,
    } = $store.state.collections;

    return $axios.$post(`${language}/collections`, {
        code,
        typeId: type,
    });
}
