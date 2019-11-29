/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <VerticalCenteredView>
                    <ProductCommentsForm />
                </VerticalCenteredView>
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { DATA_LIMIT } from '~/defaults/grid';
import ProductCommentsForm from '~/components/Forms/ProductCommentsForm';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '~/core/components/Layout/VerticalCenteredView';

export default {
    name: 'ProductCommentsTab',
    components: {
        VerticalCenteredView,
        VerticalFixedScroll,
        ProductCommentsForm,
        ResponsiveCenteredViewTemplate,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    async fetch({
        store,
        params,
    }) {
        const { id } = params;
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
