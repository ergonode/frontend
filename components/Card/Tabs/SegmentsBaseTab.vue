/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <SegmentsBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import SegmentsBaseCard from '~/components/Card/Cards/SegmentsBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'SegmentsBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        SegmentsBaseCard,
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
