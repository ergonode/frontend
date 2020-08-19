/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <AttributeGroupForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import AttributeGroupForm from '@Attributes/components/Forms/AttributeGroupForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'AttributeGroupBaseTab',
    components: {
        CenterViewTemplate,
        AttributeGroupForm,
    },
};
</script>
