/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <WidgetsList />
    </VerticalTabBarListWrapper>
</template>

<script>

export default {
    name: 'WidgetsListTab',
    components: {
        VerticalTabBarListWrapper: () => import('~/core/components/Tab/VerticalTabBarListWrapper'),
        WidgetsList: () => import('~/components/List/Widgets/WidgetsList'),
    },
};
</script>
