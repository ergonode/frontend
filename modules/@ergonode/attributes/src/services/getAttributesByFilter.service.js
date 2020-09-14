/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedArrayOptions,
} from '@Core/models/mappers/translationsMapper';

export default async function ({
    $axios,
    $store,
    filter,
}) {
    const {
        language,
    } = $store.state.authentication.user;
    const params = {
        filter,
        limit: 9999,
        offset: 0,
        view: 'list',
        order: 'ASC',
    };

    return $axios.$get('attributes', {
        params,
    }).then(({
        collection,
    }) => getMappedArrayOptions({
        options: collection,
        languageCode: language,
    }));
}
