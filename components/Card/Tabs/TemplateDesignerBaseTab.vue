/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template #content>
            <TemplateDesignerBaseCard />
        </template>
        <template #footer>
            <Footer :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import TemplateDesignerBaseCard from '~/components/Card/Cards/TemplateDesignerBaseCard';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'TemplateDesignerBaseTab',
    components: {
        Footer,
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
