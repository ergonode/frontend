/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <ListHeader header="Widgets" />
        <List>
            <ListScrollableContainer>
                <WidgetsListElement
                    v-for="(widget, index) in widgets"
                    :key="index"
                    :item="widget" />
            </ListScrollableContainer>
        </List>
    </VerticalTabBarList>
</template>

<script>

import {
    mapState,
} from 'vuex';

export default {
    name: 'WidgetsListTab',
    components: {
        VerticalTabBarList: () => import('@Core/components/TabBar/VerticalTabBarList'),
        List: () => import('@Core/components/List/List'),
        ListScrollableContainer: () => import('@Core/components/List/ListScrollableContainer'),
        WidgetsListElement: () => import('@Templates/components/Lists/Widgets/WidgetsListElement'),
        ListHeader: () => import('@Core/components/List/ListHeader'),
    },
    computed: {
        ...mapState('productTemplate', [
            'types',
        ]),
        widgets() {
            return this.types.filter(type => type.variant === 'ui');
        },
    },
};
</script>
