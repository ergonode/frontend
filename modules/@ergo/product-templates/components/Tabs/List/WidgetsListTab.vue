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
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        WidgetsList: () => import('@Templates/components/Lists/Widgets/WidgetsList'),
    },
};
</script>
