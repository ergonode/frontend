/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs" />
        </template>
        <template #grid>
            <ConditionSetWrapper />
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </GridViewTemplate>
</template>

<script>
import GridViewTemplate from '~/core/components/Layout/GridViewTemplate';

export default {
    name: 'ConditionSetDesignTab',
    components: {
        GridViewTemplate,
        VerticalTabBar: () => import('~/core/components/Tab/VerticalTabBar'),
        ConditionSetWrapper: () => import('~/components/ConditionSetDesigner/ConditionSetWrapper'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        verticalTabs: [
            {
                title: 'Conditions',
                component: () => import('~/components/Card/Tabs/ConditionsListTab'),
                iconPath: 'Menu/IconCategory',
            },
        ],
    }),
};
</script>
