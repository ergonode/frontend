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
        name, description,
    } = $store.state.role;

    return $axios.$post(`${language}/roles`, {
        name,
        description,
    });
}
