/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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

export default {
    name: 'ResourceInformationTab',
    components: {
        ResourceInformationForm,
    },
};
</script>
