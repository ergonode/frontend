/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <CategoryTreeForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import CategoryTreeForm from '@Trees/components/Forms/CategoryTreeForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'CategoryTreeBaseTab',
    components: {
        CategoryTreeForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
