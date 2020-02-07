/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { title, image } = $store.state.templateDesigner;

    return $axios.$post(`${language}/templates`, { name: title, image });
}
