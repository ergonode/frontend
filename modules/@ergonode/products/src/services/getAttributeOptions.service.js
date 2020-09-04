/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({
    $axios, id,
}) {
    return $axios.$get(`attributes/${id}/options`);
}
