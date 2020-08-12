/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ResourceRelationsForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import ResourceRelationsForm from '@Media/components/Forms/ResourceRelationsForm';

export default {
    name: 'ResourceRelationsTab',
    components: {
        ResourceRelationsForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
