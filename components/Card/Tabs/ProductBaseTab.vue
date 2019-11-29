/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <ProductBaseCard />
            </VerticalFixedScroll>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ProductBaseCard from '~/components/Card/Cards/ProductBaseCard';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'ProductBaseTab',
    components: {
        VerticalFixedScroll,
        Footer,
        ProductBaseCard,
        ResponsiveCenteredViewTemplate,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
