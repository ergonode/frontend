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
        type,
        configuration,
    } = $store.state.channel;
    const {
        channels,
    } = $store.state.dictionaries;
    const typeId = getKeyByValue(channels, type);

    let data = {
        type: typeId,
    };

    if (configuration) {
        data = {
            ...data,
            ...JSON.parse(configuration),
        };
    }

    return $axios.$post('channels', data);
}
