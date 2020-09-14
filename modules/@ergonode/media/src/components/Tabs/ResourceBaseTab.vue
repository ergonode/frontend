/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ResourceForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import ResourceForm from '@Media/components/Forms/ResourceForm';

export default {
    name: 'ResourceBaseTab',
    components: {
        ResourceForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
