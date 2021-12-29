/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridPanelHeader',
    computed: {
        classes() {
            return 'grid-panel-header';
        },
    },
};
</script>

<style lang="scss" scoped>
.grid-panel-header {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 6px 0 4px;

    & > * {
        margin: 8px 0 0 12px;
    }
}
</style>
