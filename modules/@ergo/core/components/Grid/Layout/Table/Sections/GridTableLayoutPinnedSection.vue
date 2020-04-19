/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['pinned-section', { 'pinned-section--pinned': isPinned }]">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridTableLayoutPinnedSection',
    props: {
        isPinned: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .pinned-section {
        position: sticky;
        right: 0;
        z-index: $Z_INDEX_LVL_3;
        display: flex;

        &--pinned {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
