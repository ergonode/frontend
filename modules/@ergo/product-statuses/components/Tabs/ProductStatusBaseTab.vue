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
import ProductStatusForm from '@Statuses/components/Forms/ProductStatusForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ProductStatusBaseTab',
    components: {
        ProductStatusForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
