/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="
            [
                'filters',
                {
                    // NOTE: Uncomment when filters are implemented
                    // 'element-dragged': isListElementDragging,
                    'filter-dragged': isFilterDragging,
                }
            ]" />
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'GridGlobalFilters',
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            isFilterDragging: state => state.isFilterDragging,
        }),
    },
};
</script>

<style lang="scss" scoped>
    .filters {
        display: grid;
        padding: 12px 12px 0;
        background-color: $white;
        flex-basis: 76px;

        &.element-dragged {
            z-index: 11;
            background-color: $lightGrey;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &.isFilterDragging {
            z-index: 21;
        }
    }
</style>
