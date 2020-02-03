/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListHeader
            header="Widgets"
            :is-expanded="isExpanded"
            @expand="onExpand" />
        <WidgetsList />
    </VerticalTabBarListWrapper>
</template>

<script>

export default {
    name: 'WidgetsListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/Tab/VerticalTabBarListWrapper'),
        WidgetsList: () => import('@Templates/components/Lists/Widgets/WidgetsList'),
        ListHeader: () => import('@Core/components/List/ListHeader'),
    },
    props: {
        isExpanded: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onExpand(isExpanded) {
            this.$emit('expand', isExpanded);
        },
    },
};
</script>
