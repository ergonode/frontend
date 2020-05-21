/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const params = {
        limit: 9999,
        offset: 0,
        view: 'list',
        order: 'ASC',
        columns: 'id,code,name',
    };

    return $axios.$get(`${language}/categories`, { params }).then(({ collection }) => ({
        options: collection.map(type => ({
            id: type.id,
            key: type.code,
            value: type.name,
            hint: type.name ? `#${type.code} ${language}` : '',
        })),
    }));
}
