/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <AttributeForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import AttributeForm from '@Attributes/components/Forms/AttributeForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'AttributeBaseTab',
    components: {
        CenterViewTemplate,
        AttributeForm,
    },
};
</script>
