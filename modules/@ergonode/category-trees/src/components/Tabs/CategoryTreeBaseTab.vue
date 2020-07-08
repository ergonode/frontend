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
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import CategoryTreeForm from '@Trees/components/Forms/CategoryTreeForm';

export default {
    name: 'CategoryTreeBaseTab',
    components: {
        CategoryTreeForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
