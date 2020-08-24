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
        language,
    } = $store.state.authentication.user;
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

    return $axios.$post(`${language}/sources`, data);
}
