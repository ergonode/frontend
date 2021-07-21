/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        class="advanced-filters-remove-all-button"
        :aria-label="title"
        type="button">
        <IconCancel />
        {{ title }}
    </button>
</template>

<script>

export default {
    name: 'AdvancedFiltersRemoveAllButton',
    props: {
        title: {
            type: String,
            default: 'Remove filters',
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters-remove-all-button {
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
