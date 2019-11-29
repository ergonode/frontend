/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-wrapper">
        <WidgetsList />
    </div>
</template>

<script>

export default {
    name: 'WidgetsListTab',
    components: {
        WidgetsList: () => import('~/components/List/Widgets/WidgetsList'),
    },
};
</script>

<style lang="scss" scoped>
    .tab-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 275px;
    }
</style>
