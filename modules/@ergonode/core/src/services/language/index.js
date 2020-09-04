/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    getAll({
        $axios,
        params = {
            limit: 9999,
            offset: 0,
            view: 'list',
            field: 'name',
            order: 'ASC',
        },
    }) {
        return $axios.$get('languages', {
            params,
        });
    },
    update({
        $axios,
        data,
    }) {
        return $axios.$put('languages', data);
    },
};
