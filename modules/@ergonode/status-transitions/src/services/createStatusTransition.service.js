/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';

export default function ({
    $axios, $store,
}) {
    const {
        source, destination, roles,
    } = $store.state.statusTransition;
    const data = {
        source: isObject(source) ? source.key : null,
        destination: isObject(destination) ? destination.key : null,
        roles,
    };

    return $axios.$post('workflow/default/transitions', data);
}
