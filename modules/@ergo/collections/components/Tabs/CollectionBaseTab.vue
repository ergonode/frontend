/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <CollectionForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import CollectionForm from '@Collections/components/Forms/CollectionForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'CollectionBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        CollectionForm,
    },
};
</script>
