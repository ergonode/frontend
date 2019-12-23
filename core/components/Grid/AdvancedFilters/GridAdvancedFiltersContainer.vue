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
} from '~/model/drag_and_drop/helpers';

export default {
    name: 'GridAdvancedFiltersContainer',
    methods: {
        onDragLeave({ pageX, pageY }) {
            if (pageX === 0 && pageY === 0) return false;

            const { filtersContent } = this.$refs;
            const elementBelowMouse = document.elementFromPoint(pageX, pageY);
            const isOutOfBounds = isMouseOutOfBoundsElement(filtersContent, pageX, pageY);
            const isTrashBelowMouse = elementBelowMouse && elementBelowMouse.className === 'trash-can';

            if (isOutOfBounds || isTrashBelowMouse) {
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
