/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <nav class="navigation-bar">
        <section class="navigation-bar__breadcrumbs">
            <slot name="breadcrumbs" />
        </section>
        <section class="navigation-bar__actions">
            <slot name="actions" />
        </section>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
};
</script>

<style lang="scss" scoped>
    .navigation-bar {
        display: flex;
        justify-content: space-between;
        height: 48px;
        box-sizing: border-box;
        background-color: $GRAPHITE_COAL;

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
