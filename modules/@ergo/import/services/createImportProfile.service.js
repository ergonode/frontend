/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getKeyByValue } from '@Core/models/objectWrapper';

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { name, type } = $store.state.import;
    const { sources } = $store.state.dictionaries;
    const typeId = getKeyByValue(sources, type);

    const data = {
        type: 'magento-1-csv',
        name: 'name',
        host: 'http://test.host',
        import: {
            templates: true,
            attributes: true,
            categories: true,
            multimedia: false,
            products: true,
        },
        default_language: 'EN',
        languages: [],
    };

    return $axios.$post(`${language}/sources`, data);
}
