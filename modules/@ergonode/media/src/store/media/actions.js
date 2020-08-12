/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getResourceById({
        commit,
    }, id) {
        return this.app.$axios.$get(`multimedia/${id}`);
    },
};
