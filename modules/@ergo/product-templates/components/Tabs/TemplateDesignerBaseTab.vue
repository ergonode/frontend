/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <TemplateDesignerForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import TemplateDesignerForm from '@Templates/components/Forms/TemplateDesignerForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'TemplateDesignerBaseTab',
    components: {
        TemplateDesignerForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
