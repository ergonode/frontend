/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <ConditionSetBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import ConditionSetBaseCard from '~/components/Card/Cards/ConditionSetBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'ConditionSetBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        ConditionSetBaseCard,
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
