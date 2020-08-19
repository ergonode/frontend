/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ProductStatusForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import ProductStatusForm from '@Statuses/components/Form/ProductStatusForm';

export default {
    name: 'ProductStatusBaseTab',
    components: {
        ProductStatusForm,
        CenterViewTemplate,
    },
};
</script>
