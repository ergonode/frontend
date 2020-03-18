/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'advanced-filters-ghost',
            {'advanced-filters-ghost--hovered': isMouseOverFilters}
        ]">
        <IconAddFilter :fill-color="addIconFillColor" />
        ADD FILTER
    </div>
</template>

<script>
import {
    WHITE, GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'GridAdvancedFilterGhost',
    components: {
        IconAddFilter: () => import('@Core/components/Icons/Actions/IconAddFilter'),
    },
    props: {
        isMouseOverFilters: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        addIconFillColor() {
            return this.isMouseOverFilters ? WHITE : GRAPHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters-ghost {
        $filter: &;

        display: grid;
        grid-column-gap: 8px;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        justify-content: center;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;
        color: $GRAPHITE;
        font: $FONT_BOLD_12_16;

        &--hovered {
            background-color: $GREEN;
            color: $WHITE;
        }
    }
</style>
