/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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

export default {
    name: 'ResourceRelationsTab',
    components: {
        ResourceRelationsForm,
    },
};
</script>
