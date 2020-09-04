/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    get({
        $axios,
    }) {
        return $axios.$get('language/tree');
    },
    update({
        $axios,
        data,
    }) {
        return $axios.$put('language/tree', data);
    },
};
