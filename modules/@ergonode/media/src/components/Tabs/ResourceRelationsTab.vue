/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ResourceRelationsForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import ResourceRelationsForm from '@Media/components/Forms/ResourceRelationsForm';

export default {
    name: 'ResourceRelationsTab',
    components: {
        ResourceRelationsForm,
        CenterViewTemplate,
    },
};
</script>
