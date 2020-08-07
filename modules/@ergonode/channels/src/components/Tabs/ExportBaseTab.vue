/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ExportDetails />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ExportDetails from '@Channels/components/Tables/ExportDetails';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ExportBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ExportDetails,
    },
};
</script>
