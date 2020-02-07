/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { code, color } = $store.state.productStatus;

    return $axios.$post(`${language}/status`, { code, color });
}
