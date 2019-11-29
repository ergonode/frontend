/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <AttributeBaseCard />
            </VerticalFixedScroll>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import AttributeBaseCard from '~/components/Card/Cards/AttributeBaseCard';
import Footer from '~/components/ReusableFooter/Footer';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'AttributeBaseTab',
    components: {
        VerticalFixedScroll,
        ResponsiveCenteredViewTemplate,
        Footer,
        AttributeBaseCard,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
