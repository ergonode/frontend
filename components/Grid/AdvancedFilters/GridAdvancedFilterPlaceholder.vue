/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="advanced-filters-placeholder">
        <span class="advanced-filters-placeholder__title">
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
        padding: 8px 12px;
        background-color: $lightGrey;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);

        &__title {
            @include setFont(medium, small, regular, $darkGraphite);
        }
    }
</style>
