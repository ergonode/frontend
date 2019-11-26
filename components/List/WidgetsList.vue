/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <ListScrollableContainer>
            <WidgetListElement
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
        List: () => import('~/components/List/List'),
        ListScrollableContainer: () => import('~/components/List/ListScrollableContainer'),
        WidgetListElement: () => import('~/components/List/WidgetListElement'),
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
