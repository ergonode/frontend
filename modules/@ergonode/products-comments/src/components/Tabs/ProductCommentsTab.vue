/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <CommentsForm
                :scope="scope"
                :disabled="!isAllowedToUpdate"
                :errors="errors"
                :no-data-placeholder="noDataPlaceholder" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CommentsForm from '@Comments/components/Forms/CommentsForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import PRIVILEGES from '@Products/config/privileges';

export default {
    name: 'ProductCommentsTab',
    components: {
        CommentsForm,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    async fetch({
        app,
        store,
        params,
    }) {
        const {
            id,
        } = params;
        const requestParams = {
            limit: DATA_LIMIT,
            offset: 0,
            filter: `object_id=${id}`,
            field: 'created_at',
        };

        await store.dispatch('comment/__setState', {
            key: 'objectId',
            value: id,
        });
        await store.dispatch('comment/getComments', {
            params: requestParams,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@ProductsComments.product.components.ProductCommentsTab.getRequest'),
                });
            },
        });
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
        noDataPlaceholder() {
            return this.$t('@ProductsComments.product.components.ProductCommentsTab.noData');
        },
    },
};
</script>
