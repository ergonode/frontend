/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <AttributeForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import AttributeForm from '@Attributes/components/Forms/AttributeForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'AttributeBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        AttributeForm,
    },
};
</script>
