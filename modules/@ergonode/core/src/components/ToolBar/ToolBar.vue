/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <nav class="tool-bar">
        <section class="tool-bar__breadcrumbs">
            <slot name="breadcrumbs" />
        </section>
        <section class="tool-bar__actions">
            <slot name="actions" />
        </section>
    </nav>
</template>

<script>
export default {
    name: 'ToolBar',
};
</script>

<style lang="scss" scoped>
    .tool-bar {
        position: fixed;
        z-index: $Z_INDEX_LVL_9;
        display: flex;
        justify-content: space-between;
        height: 48px;
        box-sizing: border-box;
        background-color: $GRAPHITE_COAL;
        box-shadow: $ELEVATOR_2_DP;
        will-change: left;
        transition: left 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

        &__breadcrumbs {
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 8px;
            align-items: center;
            padding: 0 16px;
            box-sizing: border-box;
        }

        &__actions {
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 1px;
            background-color: $GRAPHITE_DARK;
            border-left: $BORDER_1_GRAPHITE_DARK;
        }
    }
</style>
