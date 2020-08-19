/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <CategoryTreeForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import CategoryTreeForm from '@Trees/components/Forms/CategoryTreeForm';

export default {
    name: 'CategoryTreeBaseTab',
    components: {
        CategoryTreeForm,
        CenterViewTemplate,
    },
};
</script>
