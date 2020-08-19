/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ResourceForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import ResourceForm from '@Media/components/Forms/ResourceForm';

export default {
    name: 'ResourceBaseTab',
    components: {
        ResourceForm,
        CenterViewTemplate,
    },
};
</script>
