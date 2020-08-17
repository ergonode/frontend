/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';

export default async function ({
    $axios, $store,
}) {
    const {
        language,
    } = $store.state.authentication.user;
    const {
        name, type, configuration,
    } = $store.state.channels;
    const {
        channels,
    } = $store.state.dictionaries;
    const typeId = getKeyByValue(channels, type);

    let data = {
        type: typeId,
        name,
    };

    if (configuration) {
        data = {
            ...data,
            ...JSON.parse(configuration),
        };
    }

    return $axios.$post(`${language}/channels`, data);
}
