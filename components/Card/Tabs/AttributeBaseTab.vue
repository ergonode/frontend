/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <AttributeBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import AttributeBaseCard from '~/components/Card/AttributeBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'AttributeBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        AttributeBaseCard,
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
