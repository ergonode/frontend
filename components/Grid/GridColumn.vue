/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="
            [
                'column',
                `column-${column.id}`,
                'column--border-right',
                {
                    'column__left-pinned': column.isLeftPinned,
                    'column__right-pinned': column.isRightPinned,
                    'column__extender': isExtenderColumn,
                    'column__ghost': isGhostColumn,
                }
            ]"
        :style="colRowsTemplate">
        <slot v-if="!isGhostColumn" />
    </div>
</template>
<script>

export default {
    name: 'GridColumn',
    props: {
        index: {
            type: Number,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        rowsHeight: {
            type: Number,
            required: false,
            default: 40,
        },
        isPinnedRight: {
            type: Boolean,
            required: false,
            default: false,
        },
        isPinnedLeft: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isDragged: false,
        };
    },
    computed: {
        colRowsTemplate() {
            return {
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        isExtenderColumn() {
            return this.column.id === 'extender';
        },
        isGhostColumn() {
            return this.column.id === 'ghost';
        },
    },
};
</script>


<style lang="scss" scoped>
    .column {
        position: relative;
        display: grid;
        padding-right: 1px;

        &--border-right {
            border-right: 1px solid $grey;
            padding-right: 0;
        }

        &.hover, &__right-pinned {
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &.hover {
            z-index: 5;
        }

        &__ghost {
            height: 100%;
            background-color: $primary;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &__right-pinned {
            position: sticky;
            right: 0;
            z-index: 3;
        }

        &__left-pinned {
            left: 0;
        }
    }
</style>
