/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({
    $axios,
    $store,
}) {
    const { language } = $store.state.authentication.user;
    const { code } = $store.state.attributeGroup;

    return $axios.$post(`${language}/attributes/groups`, { code });
}
