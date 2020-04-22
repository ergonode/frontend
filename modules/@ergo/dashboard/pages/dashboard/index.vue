/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-wrapper">
        <Test>
            <template #test>
                <div>Hey! It's working</div>
            </template>
        </Test>
        <SimpleGrid
            class="grid"
            :title="title"
            :items="filteredItems()" />
    </div>
</template>

<script>
import { GRID_ITEMS } from '@Dashboard/defaults/dashboard';

export default {
    name: 'Dashboard',
    components: {
        SimpleGrid: () => import('@Dashboard/components/SimpleGrid'),
        Test: () => import('@Core/components/Inputs/Test'),
    },
    data() {
        return {
            title: 'Take an action',
        };
    },
    methods: {
        filteredItems() {
            return GRID_ITEMS.filter(e => this.$hasAccess(e.privileges));
        },
    },
    head() {
        return {
            title: 'Dashboard - Ergonode',
        };
    },
};
</script>

<style lang="scss" scoped>
    .grid-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: $WHITESMOKE;
    }
</style>
