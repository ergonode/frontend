/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL_ID,
} from '@Attributes/defaults/attributes';

export default function ({
    $axios, $store,
}) {
    const {
        title, image, defaultTextAttribute, defaultImageAttribute,
    } = $store.state.productTemplate;

    return $axios.$post('templates', {
        name: title,
        image,
        defaultLabel: defaultTextAttribute !== SKU_MODEL_ID
            ? defaultTextAttribute
            : null,
        defaultImage: defaultImageAttribute,
    });
}
