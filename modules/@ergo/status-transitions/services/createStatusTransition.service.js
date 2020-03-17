/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject } from '@Core/models/objectWrapper';

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { source, destination, roles } = $store.state.transitions;
    const data = {
        source: isObject(source) ? source.key : null,
        destination: isObject(destination) ? destination.key : null,
        // roles: roles.map(role => role.key),
    };

    if (roles.length > 0) {
        data.roles = roles.map(role => role.key);
    }

    return $axios.$post(`${language}/workflow/default/transitions`, data);
}
