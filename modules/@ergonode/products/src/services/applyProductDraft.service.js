/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default function ({
    $axios,
    id,
}) {
    const path = `products/${id}/draft/persist`;

    return $axios.$put(path, {});
}
