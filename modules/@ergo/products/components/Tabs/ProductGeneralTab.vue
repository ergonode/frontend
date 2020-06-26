/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ProductForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ProductForm from '@Products/components/Form/ProductForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ProductGeneralTab',
    components: {
        ProductForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
