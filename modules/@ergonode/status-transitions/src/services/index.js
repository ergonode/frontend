/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    source,
    destination,
}) => $axios.$get(`workflow/default/transitions/${source}/${destination}`);

export const update = ({
    $axios,
    source,
    destination,
    data,
}) => $axios.$put(`workflow/default/transitions/${source}/${destination}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('workflow/default/transitions', data);

export const remove = ({
    $axios,
    source,
    destination,
}) => $axios.$delete(`workflow/default/transitions/${source}/${destination}`);
