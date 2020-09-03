/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    async update({
        $axios,
        languageCode,
        id,
        data,
    }) {
        await $axios.$put(`${languageCode}/roles/${id}`, data);
    },
    async create({
        $axios,
        languageCode,
        data,
    }) {
        const {
            id,
        } = await $axios.$post(`${languageCode}/roles`, data);

        return id;
    },
};
