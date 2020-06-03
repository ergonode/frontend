/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarListWrapper>
        <ListHeader header="Widgets" />
        <List>
            <ListScrollableContainer>
                <WidgetsListElement
                    v-for="(widget, index) in widgets"
                    :key="index"
                    :item="widget" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarListWrapper>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'WidgetsListTab',
    components: {
        VerticalTabBarListWrapper: () => import('@Core/components/TabBar/VerticalTabBarListWrapper'),
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        WidgetsListElement: () => import('@Templates/components/Lists/Widgets/WidgetsListElement'),
        ListHeader: () => import('@Core/components/List/ListHeader'),
    },
    computed: {
        ...mapState('templateDesigner', {
            types: state => state.types,
        }),
        widgets() {
            return this.types.filter(type => type.variant === 'ui');
        },
    },
};
</script>
