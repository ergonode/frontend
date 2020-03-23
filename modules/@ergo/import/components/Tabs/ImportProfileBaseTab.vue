/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <ImportProfileForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ImportProfileForm from '@Import/components/Forms/ImportProfileForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'ImportProfileBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        ImportProfileForm,
    },
};
</script>
