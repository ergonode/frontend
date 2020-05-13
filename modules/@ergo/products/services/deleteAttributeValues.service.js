/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;

    return $axios.$get(`${language}/products`);
}
