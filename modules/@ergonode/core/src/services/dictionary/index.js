/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    path,
    config,
}) => $axios.$get(path, config);
