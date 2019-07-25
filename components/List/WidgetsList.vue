/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <List>
        <div class="elements-wrapper">
            <WidgetListElement
                v-for="(widget, index) in widgets"
                :key="index"
                :item="widget" />
        </div>
    </List>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'WidgetsList',
    components: {
        List: () => import('~/components/List/List'),
        WidgetListElement: () => import('~/components/List/WidgetListElement'),
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

<style lang="scss" scoped>
    .elements-wrapper {
        height: 0;
    }
</style>
