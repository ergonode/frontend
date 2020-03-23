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

    return $axios.$post(`${language}/sources`, { type: typeId, name });
}
