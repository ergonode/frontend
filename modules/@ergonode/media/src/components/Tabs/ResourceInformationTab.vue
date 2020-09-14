/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ResourceInformationForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import ResourceInformationForm from '@Media/components/Forms/ResourceInformationForm';

export default {
    name: 'ResourceInformationTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ResourceInformationForm,
    },
};
</script>
