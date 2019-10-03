/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template #content>
            <SegmentsBaseCard />
        </template>
        <template #footer>
            <Footer :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import SegmentsBaseCard from '~/components/Card/Cards/SegmentsBaseCard';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'SegmentsBaseTab',
    components: {
        SegmentsBaseCard,
        Footer,
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
