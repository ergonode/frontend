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
        await $axios.$put(`${languageCode}/templates/${id}`, data);
    },
    async create({
        $axios,
        languageCode,
        data,
    }) {
        const {
            id,
        } = await $axios.$post(`${languageCode}/templates`, data);

        return id;
    },
};
