/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <VerticalFixedScroll>
                <UserBaseCard />
            </VerticalFixedScroll>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import UserBaseCard from '~/components/Card/Cards/UserBaseCard';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'UserBaseTab',
    components: {
        VerticalFixedScroll,
        Footer,
        ResponsiveCenteredViewTemplate,
        UserBaseCard,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
