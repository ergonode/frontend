/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({
    $axios,
}) {
    const params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        order: 'ASC',
        columns: 'id,name',
    };

    return $axios.$get('templates', {
        params,
    }).then(({
        collection,
    }) => ({
        options: collection.map(({
            id, name,
        }) => ({
            id,
            key: '',
            value: name,
            hint: '',
        })),
    }));
}
