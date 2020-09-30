/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios, path, useCache,
}) => $axios.$get(path, {
    useCache,
});
