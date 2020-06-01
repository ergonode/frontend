/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { TYPES } from '@Attributes/defaults/attributes';
import { getMappedArrayOptions } from '@Core/models/mappers/translationsMapper';

export default async function ({
    $axios,
    $store,
}) {
    const { language } = $store.state.authentication.user;
    const params = {
        filter: `type=${TYPES.SELECT}`,
        limit: 9999,
        offset: 0,
        view: 'list',
        order: 'ASC',
    };

    return $axios.$get(`${language}/attributes`, {
        params,
    }).then(({ collection }) => getMappedArrayOptions({
        options: collection,
        languageCode: language,
    }));
}
