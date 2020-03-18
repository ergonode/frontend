/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject } from '@Core/models/objectWrapper';

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const { code, type } = $store.state.collections;
    const typeId = isObject(type) ? type.id : null;

    return $axios.$post(`${language}/collections`, { code, typeId });
}
