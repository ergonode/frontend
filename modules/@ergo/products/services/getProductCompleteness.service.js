/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({
    $axios, languageCode, id,
}) {
    return $axios.$get(`${languageCode}/products/${id}/draft/completeness`);
}
