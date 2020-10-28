/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ResourceInformationForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ResourceInformationForm from '@Media/components/Forms/ResourceInformationForm';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ResourceInformationTab',
    components: {
        CenterViewTemplate,
        ResourceInformationForm,
    },
};
</script>
