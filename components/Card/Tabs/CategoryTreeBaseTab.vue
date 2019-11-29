/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <CategoryTreeBaseCard />
            </VerticalFixedScroll>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import CategoryTreeBaseCard from '~/components/Card/Cards/CategoryTreeBaseCard';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'CategoryTreeBaseTab',
    components: {
        VerticalFixedScroll,
        Footer,
        CategoryTreeBaseCard,
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
