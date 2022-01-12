/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
}) => $axios.$get('language/tree');

export const update = ({
    $axios, data,
}) => $axios.$put('language/tree', data);
