/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    getResourceById({
        commit,
        rootState,
    }, id) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;

        // {
        //     "id": "1118ac03-103d-4ab1-b1b5-1e98dd1ac1f8",
        //     "name": "product-1.jpg",
        //     "extension": "jpg",
        //     "mime": "image/jpeg",
        //     "size": 157278,
        //     "hash": "4ab4804b53ec418cc1b1db7e5dbf18aab3f46f17",
        //     "alt": []
        // }

        return this.app.$axios.$get(`${userLanguageCode}/multimedia/${id}`).then(({
            name,
            extension,
            mime,
            size,
            hash,
            alt,
        }) => {
            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'name',
                value: name.replace(extension, ''),
            });
            commit('__SET_STATE', {
                key: 'extension',
                value: extension,
            });
        });
    },
};
