/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { SKU_MODEL } from '@Templates/defaults/product';

export default function ({ $axios, $store }) {
    const { language } = $store.state.authentication.user;
    const {
        title, image, defaultTextAttribute, defaultImageAttribute,
    } = $store.state.templateDesigner;

    return $axios.$post(`${language}/templates`, {
        name: title,
        image,
        defaultText: defaultTextAttribute.id !== SKU_MODEL.id
            ? defaultTextAttribute.id
            : null,
        defaultImage: defaultImageAttribute
            ? defaultImageAttribute.id
            : null,
    });
}
