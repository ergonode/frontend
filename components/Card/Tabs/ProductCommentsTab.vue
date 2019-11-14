/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <ProductCommentsCard />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ProductCommentsCard from '~/components/Card/Cards/ProductCommentsCard';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'ProductCommentsTab',
    components: {
        Footer,
        ProductCommentsCard,
        ResponsiveCenteredViewTemplate,
        BaseForm,
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
            limit: 10,
            offset: 0,
            filter: `owner_id=${id}`,
            field: 'created_at',
        });
    },
};
</script>
