/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['ghost-column', {'ghost-column--hovered': isMouseOverGrid}]">
        <div class="container">
            <IconAddColumn :fill-color="addIconFillColor" />
            <span class="ghost-column__title">ADD COLUMN</span>
        </div>
    </div>
</template>

<script>
import {
    white, graphite,
} from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'GridGhostColumn',
    props: {
        isMouseOverGrid: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        IconAddColumn: () => import('~/components/Icon/Actions/IconAddColumn'),
    },
    computed: {
        addIconFillColor() {
            return this.isMouseOverGrid ? white : graphite;
        },
    },
};
</script>

<style lang="scss" scoped>
    .ghost-column {
        $column: &;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $lightGrey;
        box-shadow:
            inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);

        &__title {
            @include setFont(bold, small, regular, $darkGraphite);

            margin-top: 8px;
        }

        &--hovered {
            background-color: $primary;

            #{$column}__title {
                color: $white;
            }
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
