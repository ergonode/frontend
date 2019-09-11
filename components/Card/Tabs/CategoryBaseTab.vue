/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <CategoryBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import CategoryBaseCard from '~/components/Card/CategoryBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'CategoryBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        CategoryBaseCard,
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
