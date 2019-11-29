/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListScrollableContainer>
            <WidgetsListElement
                v-for="(widget, index) in widgets"
                :key="index"
                :item="widget" />
        </ListScrollableContainer>
    </List>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'WidgetsList',
    components: {
        List: () => import('~/core/components/List/List'),
        ListScrollableContainer: () => import('~/core/components/List/ListScrollableContainer'),
        WidgetsListElement: () => import('~/components/List/Widgets/WidgetsListElement'),
    },
    computed: {
        ...mapState('templateDesigner', {
            types: (state) => state.types,
        }),
        widgets() {
            return this.types.filter((type) => type.variant === 'ui');
        },
    },
};
</script>
