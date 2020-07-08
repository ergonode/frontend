/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    SKU_MODEL,
    TYPES,
} from '@Attributes/defaults/attributes';

export default function ({
    $axios, $store, type,
}) {
    const {
        language,
    } = $store.state.authentication.user;
    const params = {
        limit: 9999,
        offset: 0,
        filter: `type=${type}`,
        view: 'list',
        order: 'ASC',
        columns: 'id,code,name',
    };

    return $axios.$get(`${language}/attributes`, {
        params,
    }).then(({
        collection,
    }) => {
        const options = collection.map(element => ({
            id: element.id,
            key: element.code,
            value: element.name,
            hint: element.name ? `#${element.code} ${language}` : '',
        }));

        // TODO: Temporary till BE will create SKU as an attribute
        if (type === TYPES.TEXT) {
            options.push(SKU_MODEL);
        }

        return {
            options,
        };
    });
}
