/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <TemplateDesignerBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import TemplateDesignerBaseCard from '~/components/Card/TemplateDesignerBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'TemplateDesignerBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        TemplateDesignerBaseCard,
        BaseTab,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
