/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const get = ({
    $axios,
    id,
}) => $axios.$get(`templates/${id}`);

export const getAll = ({
    $axios,
}) => $axios.$get('templates');

export const getTypes = ({
    $axios,
    params = {
        view: 'list',
    },
}) => $axios.$get('templates/types', {
    params,
});

export const update = ({
    $axios,
    id,
    data,
}) => $axios.$put(`templates/${id}`, data);

export const create = ({
    $axios,
    data,
}) => $axios.$post('templates', data);

export const remove = ({
    $axios,
    id,
}) => $axios.$delete(`templates/${id}`);
