/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button class="grid-advanced-filters-remove-all-button">
        <IconCancel />
        Remove filters
    </button>
</template>

<script>
import IconCancel from '@UI/components/Icons/Actions/IconCancel';

export default {
    name: 'GridAdvancedFiltersRemoveAllButton',
    components: {
        IconCancel,
    },
};
</script>

<style lang="scss" scoped>
    .grid-advanced-filters-remove-all-button {
        display: flex;
        align-items: center;
        border: none;
        padding: 0 8px;
        background-color: $WHITE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        cursor: pointer;
        outline: none;
    }
</style>
