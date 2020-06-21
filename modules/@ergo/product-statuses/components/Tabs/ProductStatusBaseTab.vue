/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ProductStatusForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import ProductStatusForm from '@Statuses/components/Forms/ProductStatusForm';

export default {
    name: 'ProductStatusBaseTab',
    components: {
        ProductStatusForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
