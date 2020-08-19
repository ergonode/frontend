/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <CategoryForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CategoryForm from '@Categories/components/Forms/CategoryForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'CategoryBaseTab',
    components: {
        CategoryForm,
        CenterViewTemplate,
    },
};
</script>
