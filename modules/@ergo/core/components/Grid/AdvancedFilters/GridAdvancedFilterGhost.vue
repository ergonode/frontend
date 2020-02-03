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
        <div class="container">
            <IconAddFilter :fill-color="addIconFillColor" />
            <span class="advanced-filters-ghost__title font--bold-12-16">
                ADD FILTER
            </span>
        </div>
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

        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;

        &__title {
            margin-left: 8px;
            color: $GRAPHITE_DARK;
        }

        &--hovered {
            background-color: $GREEN;

            #{$filter}__title {
                color: $WHITE;
            }
        }
    }

    .container {
        display: flex;
        align-items: center;
    }
</style>
