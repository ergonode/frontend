/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { source, destination, roles } = $store.state.transitions;
    const data = {
        source: source.key,
        destination: destination.key,
        roles: roles.map(role => role.key),
    };

    return $axios.$post(`${language}/workflow/default/transitions`, data);
}
