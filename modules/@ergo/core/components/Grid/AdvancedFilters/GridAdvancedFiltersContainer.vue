/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        ref="filtersContent"
        class="advanced-filters-container"
        @dragleave="onDragLeave">
        <slot />
    </div>
</template>

<script>
import {
    isMouseOutOfBoundsElement,
    isTrashBelowMouse,
    getPositionForBrowser,
} from '@Core/models/drag_and_drop/helpers';

export default {
    name: 'GridAdvancedFiltersContainer',
    methods: {
        onDragLeave(event) {
            const { xPos, yPos } = getPositionForBrowser(event);

            if (xPos === 0 && yPos === 0) return false;

            const { filtersContent } = this.$refs;
            const isOutOfBounds = isMouseOutOfBoundsElement(filtersContent, xPos, yPos);

            if (isOutOfBounds || isTrashBelowMouse(xPos, yPos)) {
                this.$emit('mouseOverFilters', false);
            }

            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters-container {
        display: flex;
        flex-wrap: wrap;
        padding: 0 6px 8px 16px;
        overflow: auto;

        & > * {
            margin: 0 8px 8px 0;
        }
    }
</style>
