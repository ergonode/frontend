/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-header-settings">
        <div class="grid-header-settings__actions">
            <slot name="actions" />
        </div>
        <div class="grid-header-settings__layout-configuration">
            <slot name="configuration" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridHeaderSettings',
};
</script>

<style lang="scss" scoped>
    .grid-header-settings {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 16px 0;
        box-sizing: border-box;
        background-color: $WHITE;

        &__actions {
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 8px;
        }

        &__layout-configuration {
            display: flex;
            align-items: center;
        }
    }
</style>
