/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ProductCommentsForm
                :scope="scope"
                :errors="errors" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ProductCommentsForm from '@Comments/components/Forms/ProductCommentsForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ProductCommentsTab',
    components: {
        ProductCommentsForm,
        CenterViewTemplate,
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
                    message: 'Comments hasn`t been fetched properly',
                });
            },
        });
    },
};
</script>
