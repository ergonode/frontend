/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :tabindex="-1"
        :class="classes"
        @mousedown="onMouseDown"
        @keydown="onKeyDown">
        <GridCellResizer
            v-if="copyable"
            @copy="onCopy" />
        <slot />
    </div>
</template>

<script>
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridTableCell',
    components: {
        GridCellResizer: () => import('@Core/components/Grid/Layout/Table/Cells/Resizer/GridCellResizer'),
    },
    props: {
        column: {
            type: Number,
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
        copyable: {
            type: Boolean,
            default: false,
        },
        locked: {
            type: Boolean,
            default: false,
        },
        draft: {
            type: Boolean,
            default: false,
        },
        editKeyCode: {
            type: Number,
            default: 13,
        },
    },
    computed: {
        classes() {
            return [
                'grid-table-cell',
                `coordinates-${this.column}-${this.row}`,
                {
                    'grid-table-cell--error': this.error,
                    'grid-table-cell--locked': this.locked,
                    'grid-table-cell--selected': this.selected,
                    'grid-table-cell--draft': this.draft,
                    'grid-table-cell--disabled': this.disabled,
                },
            ];
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditCell',
        ]),
        onCopy(factor) {
            this.$emit('copy', {
                from: {
                    row: this.row,
                    column: this.column,
                },
                to: {
                    row: this.row + factor,
                    column: this.column,
                },
            });
        },
        onMouseDown(event) {
            this.setEditCell();

            if (event.detail === 2) {
                this.$emit('edit');
            }

            this.$emit('mousedown');
        },
        onKeyDown(event) {
            const {
                keyCode,
            } = event;

            let element;

            const tableLayout = document.documentElement.querySelector('.grid-table-layout');

            switch (keyCode) {
            case this.editKeyCode:
                if (!this.locked && !this.disabled) {
                    this.$emit('edit');
                }
                break;
            case 37:
                // Key: LEFT
                element = tableLayout.querySelector(`.coordinates-${this.column - 1}-${this.row}`);
                break;
            case 38:
                // Key: UP
                element = tableLayout.querySelector(`.coordinates-${this.column}-${this.row - 1}`);
                break;
            case 39:
            case 9:
                // Key: RIGHT || TAB
                element = tableLayout.querySelector(`.coordinates-${this.column + 1}-${this.row}`);

                if (!element) {
                    // We get out of bounds - go to the next line
                    element = tableLayout.querySelector(`.coordinates-0-${this.row + 1}`);
                }

                break;
            case 40:
                // Key: DOWN
                element = tableLayout.querySelector(`.coordinates-${this.column}-${this.row + 1}`);
                break;
            default: break;
            }

            event.preventDefault();

            if (element && keyCode !== this.editKeyCode) {
                element.focus();
            }

            element = null;

            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-table-cell {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        outline: none;
        box-sizing: border-box;
        border-bottom: 1px solid $GREY;
        cursor: pointer;

        &:not(&--error):not(&--locked):not(&--disabled) {
            &:focus {
                position: relative;
                box-shadow: inset 0 0 0 2px $GREEN;

                & > .cell-resizer {
                    opacity: 1;
                }
            }
        }

        &--selected, &--draft {
            background-color: $GREEN_LIGHT;
        }

        &--error {
            background-color: $RED_LIGHT;

            &:focus {
                box-shadow: inset 0 0 0 2px $RED;
            }
        }

        &--locked, &--disabled {
            &:focus {
                box-shadow: inset 0 0 0 2px $GRAPHITE_LIGHT;
            }
        }

        &--disabled {
            background-color: $WHITESMOKE;
        }
    }
</style>
