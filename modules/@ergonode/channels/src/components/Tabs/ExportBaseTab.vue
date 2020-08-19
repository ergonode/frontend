/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ExportDetailsForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ExportDetailsForm from '@Channels/components/Forms/ExportDetailsForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ExportBaseTab',
    components: {
        CenterViewTemplate,
        ExportDetailsForm,
    },
};
</script>
