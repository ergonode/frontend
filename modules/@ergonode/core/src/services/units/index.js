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
        await $axios.$put(`${languageCode}/units/${id}`, data);
    },
    async create({
        $axios,
        languageCode,
        data,
    }) {
        const {
            id,
        } = await $axios.$post(`${languageCode}/units`, data);

        return id;
    },
};
