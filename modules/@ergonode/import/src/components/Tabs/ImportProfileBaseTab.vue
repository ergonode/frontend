/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ImportProfileForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import ImportProfileForm from '@Import/components/Forms/ImportProfileForm';

export default {
    name: 'ImportProfileBaseTab',
    components: {
        CenterViewTemplate,
        ImportProfileForm,
    },
};
</script>
