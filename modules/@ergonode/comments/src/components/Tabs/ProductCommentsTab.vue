/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ProductCommentsForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ProductCommentsForm from '@Comments/components/Form/ProductCommentsForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';

export default {
    name: 'ProductCommentsTab',
    components: {
        ProductCommentsForm,
        ResponsiveCenteredViewTemplate,
    },
    async fetch({
        store,
        params,
    }) {
        const {
            id,
        } = params;
        await store.dispatch('comments/setCommentObjectId', id);
        await store.dispatch('comments/getComments', {
            limit: DATA_LIMIT,
            offset: 0,
            filter: `object_id=${id}`,
            field: 'created_at',
        });
    },
};
</script>
