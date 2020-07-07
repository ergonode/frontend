/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL_ID,
} from '@Templates/defaults/product';

export default function ({
    $axios, $store,
}) {
    const {
        language,
    } = $store.state.authentication.user;
    const {
        title, image, defaultTextAttribute, defaultImageAttribute,
    } = $store.state.templateDesigner;

    return $axios.$post(`${language}/templates`, {
        name: title,
        image,
        defaultLabel: defaultTextAttribute !== SKU_MODEL_ID
            ? defaultTextAttribute
            : null,
        defaultImage: defaultImageAttribute,
    });
}
