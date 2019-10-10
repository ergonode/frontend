/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template #content>
            <AttributeBaseCard />
        </template>
        <template #footer>
            <Footer :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import AttributeBaseCard from '~/components/Card/Cards/AttributeBaseCard';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'AttributeBaseTab',
    components: {
        Footer,
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
