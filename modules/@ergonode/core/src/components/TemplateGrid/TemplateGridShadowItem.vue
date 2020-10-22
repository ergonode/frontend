/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['shadow-grid-item', {'shadow-grid-item--last-row': lastRow}]"
        :shadow-id="itemId - 1" />
</template>
<script>

export default {
    name: 'TemplateGridShadowItem',
    props: {
        /**
         * Determines whether is last row or not
         */
        lastRow: {
            type: Boolean,
            required: true,
        },
        /**
         * Unique item identifier
         */
        itemId: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .shadow-grid-item {
        border-top: $BORDER_DASHED_GREY;
        border-left: $BORDER_DASHED_GREY;

        &--last-row {
            border-bottom: none;
        }
    }
</style>
