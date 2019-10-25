/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="advanced-filters-placeholder">
        <span class="font--medium-12-16">
            Create a filter by dragging an attribute here
        </span>
    </div>
</template>

<script>
export default {
    name: 'GridAdvancedFilterPlaceholder',
};
</script>

<style lang="scss" scoped>
    .advanced-filters-placeholder {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;
        color: $GRAPHITE_DARK;
    }
</style>
