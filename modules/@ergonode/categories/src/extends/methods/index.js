/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getProductById({
    data, commit,
}) {
    if (data.categories) {
        commit('__SET_STATE', {
            key: 'categories',
            value: data.categories,
        });
    }
}
