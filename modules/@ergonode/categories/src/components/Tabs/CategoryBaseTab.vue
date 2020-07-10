/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <CategoryForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import CategoryForm from '@Categories/components/Forms/CategoryForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'CategoryBaseTab',
    components: {
        CategoryForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
