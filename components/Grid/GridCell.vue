/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div
        v-grid-navigationable="{
            actionCell,
            editingAllowed,
            column,
            row,
        }"
        :class="gridCellClasses">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'GridCell',
    props: {
        editingAllowed: {
            type: Boolean,
            required: true,
        },
        actionCell: {
            type: Boolean,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        selected: {
            type: Boolean,
            required: false,
            default: false,
        },
        error: {
            type: Boolean,
            required: false,
            default: false,
        },
        locked: {
            type: Boolean,
            required: false,
            default: false,
        },
        draft: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        gridCellClasses() {
            return [
                'grid-cell',
                `coordinates-${this.column}-${this.row}`,
                {
                    'grid-cell--error': this.error,
                    'grid-cell--locked': this.locked,
                    'grid-cell--selected': this.selected,
                    'grid-cell--draft': this.draft,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-cell {
        position: relative;
        display: flex;
        outline: none;
        box-sizing: border-box;
        border-bottom: 1px solid $grey;

        &:not(&--selected):not(&--draft):not(&--error) {
            &:nth-child(even) {
                background-color: $white;
            }
        }

        &:not(&--error):not(&--locked) {
            &:focus {
                box-shadow: inset 0 0 0 2px $primary;
            }
        }

        &--selected, &--draft {
            background-color: $lightGreen;
        }

        &--error {
            background-color: $lightRed;

            &:focus {
                box-shadow: inset 0 0 0 2px $error;
            }
        }

        &--locked:focus {
            box-shadow: inset 0 0 0 2px $lightGraphite;
        }
    }
</style>
