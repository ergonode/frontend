/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template #content>
            <TransitionBaseCard />
        </template>
        <template #footer>
            <Footer :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import TransitionBaseCard from '~/components/Card/Cards/TransitionBaseCard';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'TransitionBaseTab',
    components: {
        TransitionBaseCard,
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
