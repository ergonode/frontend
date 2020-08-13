/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ExportDetailsForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ExportDetailsForm from '@Channels/components/Forms/ExportDetailsForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ExportBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ExportDetailsForm,
    },
};
</script>
