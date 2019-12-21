/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <ProductForm />
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ProductForm from '~/components/Forms/ProductForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'ProductBaseTab',
    components: {
        VerticalFixedScroll,
        ProductForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
