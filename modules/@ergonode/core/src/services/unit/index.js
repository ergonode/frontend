/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    get({
        $axios,
        id,
    }) {
        return $axios.$get(`units/${id}`);
    },
    update({
        $axios,
        id,
        data,
    }) {
        return $axios.$put(`units/${id}`, data);
    },
    create({
        $axios,
        data,
    }) {
        return $axios.$post('units', data);
    },
    remove({
        $axios,
        id,
    }) {
        return $axios.$delete(`units/${id}`);
    },
};
