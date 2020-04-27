/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <AttributeGroupForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import AttributeGroupForm from '@Attributes/components/Forms/AttributeGroupForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'AttributeGroupBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        AttributeGroupForm,
    },
};
</script>
