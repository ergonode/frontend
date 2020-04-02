/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['ghost-column', {'ghost-column--hovered': isMouseOverGrid}]">
        <div class="container">
            <IconAddColumn :fill-color="addIconFillColor" />
            <span class="ghost-column__title font--bold-12-16">ADD COLUMN</span>
        </div>
    </div>
</template>

<script>
import {
    WHITE, GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'GridGhostColumn',
    components: {
        IconAddColumn: () => import('@Core/components/Icons/Actions/IconAddColumn'),
    },
    props: {
        isMouseOverGrid: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        addIconFillColor() {
            return this.isMouseOverGrid ? WHITE : GRAPHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .ghost-column {
        $column: &;

        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 80px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;

        &__title {
            margin-top: 8px;
            color: $GRAPHITE;
        }

        &--hovered {
            background-color: $GREEN;

            #{$column}__title {
                color: $WHITE;
            }
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
