/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-wrapper">
        <SimpleGrid
            class="grid"
            :title="title"
            :items="filteredItems()" />
    </div>
</template>

<script>

import GridItems from '~/model/dashboard_grid_columns';

export default {
    name: 'Dashboard',
    components: {
        SimpleGrid: () => import('~/components/Grid/SimpleGrid'),
    },
    data() {
        return {
            title: 'Take an action',
        };
    },
    methods: {
        filteredItems() {
            return GridItems.filter(e => this.$canIUse(e.privileges));
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: $background;
    }
</style>
