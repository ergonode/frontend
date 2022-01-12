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
    name: 'GridPageArrowsPanel',
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'grid-page-selector-arrows-panel',
                {
                    'grid-page-selector-arrows-panel--visible': this.visible,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-page-selector-arrows-panel {
        display: flex;
        align-items: center;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        opacity: 0;
        pointer-events: none;
        will-change: opacity;

        &--visible {
            opacity: 1;
            pointer-events: auto;
        }
    }
</style>
