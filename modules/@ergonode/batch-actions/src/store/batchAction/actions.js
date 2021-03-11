/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    create,
} from '@BatchActions/services';

export default {
    async addBatchAction({
        commit,
    },
    {
        request,
        onSuccess = () => {},
        onError = () => {},
    }) {
        try {
            await create({
                $axios: this.app.$axios,
                ...request,
            });

            onSuccess();
        } catch (e) {
            if (this.app.$axios.isCancel(e)) {
                return;
            }

            onError(e);
        }
    },
};
