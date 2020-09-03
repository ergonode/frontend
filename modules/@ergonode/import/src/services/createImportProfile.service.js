/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';

export default function ({
    $axios, $store,
}) {
    const {
        type,
        configuration,
    } = $store.state.import;
    const {
        sources,
    } = $store.state.dictionaries;
    const typeId = getKeyByValue(sources, type);

    let data = {
        type: typeId,
    };

    if (configuration) {
        data = {
            ...data,
            ...JSON.parse(configuration),
        };
    }

    return $axios.$post('sources', data);
}
