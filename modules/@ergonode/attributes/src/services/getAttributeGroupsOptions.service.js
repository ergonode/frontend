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
    const params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        order: 'ASC',
        columns: 'id,code,name',
    };

    return $axios.$get('attributes/groups', {
        params,
    }).then(({
        collection,
    }) => ({
        options: collection.map(element => ({
            id: element.id,
            key: element.code,
            value: element.name,
            hint: element.name ? `#${element.code} ${language}` : '',
        })),
    }));
}
