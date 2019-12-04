/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <TemplateDesignerForm />
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import TemplateDesignerForm from '~/components/Forms/TemplateDesignerForm';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'TemplateDesignerBaseTab',
    components: {
        VerticalFixedScroll,
        TemplateDesignerForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
