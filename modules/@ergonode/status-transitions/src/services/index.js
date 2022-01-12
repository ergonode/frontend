/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    from,
    to,
}) => $axios.$get(`workflow/default/transitions/${from}/${to}`);

export const update = ({
    $axios,
    from,
    to,
    data,
}) => $axios.$put(`workflow/default/transitions/${from}/${to}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('workflow/default/transitions', data);

export const remove = ({
    $axios,
    from,
    to,
}) => $axios.$delete(`workflow/default/transitions/${from}/${to}`);
