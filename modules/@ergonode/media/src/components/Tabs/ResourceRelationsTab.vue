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
import ResourceRelationsForm from '@Media/components/Forms/ResourceRelationsForm';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ResourceRelationsTab',
    components: {
        ResourceRelationsForm,
        CenterViewTemplate,
    },
};
</script>
