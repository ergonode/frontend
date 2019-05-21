/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <ProductBaseCard slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import ProductBaseCard from '~/components/Card/ProductBaseCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'ProductBaseTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        ProductBaseCard,
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
