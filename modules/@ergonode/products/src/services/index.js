/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    async getDraft({
        $axios,
        languageCode,
        id,
        data,
    }) {
        const {
            attributes,
        } = await $axios.$get(`${languageCode}/products/${id}/draft`, data);

        return attributes;
    },
    async applyDraft({
        $axios,
        languageCode,
        id,
    }) {
        const {
            attributes,
        } = await $axios.$put(`${languageCode}/products/${id}/draft/persist`, {});

        return attributes;
    },
    async update({
        $axios,
        languageCode,
        id,
        data,
    }) {
        await $axios.$put(`${languageCode}/products/${id}`, data);
    },
    async create({
        $axios,
        languageCode,
        data,
    }) {
        const {
            id,
        } = await $axios.$post(`${languageCode}/products`, data);

        return id;
    },
};
