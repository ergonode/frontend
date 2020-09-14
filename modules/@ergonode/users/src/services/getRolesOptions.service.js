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
        columns: 'id,description,name',
    };

    return $axios.$get('roles', {
        params,
    }).then(({
        collection,
    }) => ({
        options: collection.map(element => ({
            id: element.id,
            key: element.id,
            value: element.name,
            hint: element.description,
        })),
    }));
}
