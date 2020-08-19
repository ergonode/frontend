/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <CollectionForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CollectionForm from '@Collections/components/Forms/CollectionForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'CollectionGeneralTab',
    components: {
        CenterViewTemplate,
        CollectionForm,
    },
};
</script>
