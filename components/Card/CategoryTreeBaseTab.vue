/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <CategoryTreeBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import CategoryTreeBaseCard from '~/components/Card/CategoryTreeBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'CategoryTreeBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        CategoryTreeBaseCard,
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
