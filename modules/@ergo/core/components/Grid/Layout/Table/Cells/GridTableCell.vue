/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :tabindex="-1"
        :class="classes"
        @mousedown="onMouseDown"
        @keydown="onKeyDown"
        @focus="onFocus"
        @blur="onBlur">
        <GridCellResizer
            v-if="copyable"
            @copy="onCopy" />
        <slot :is-editing="isEditing" />
    </div>
</template>

<script>

export default {
    name: 'GridTableCell',
    inject: [
        'getEditingCellCoordinates',
        'setEditingCellCoordinates',
        'setFocusedCellCoordinates',
        'getTableLayoutElement',
    ],
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
        isEditing: {
            get() {
                const {
                    row, column,
                } = this.getEditingCellCoordinates();

                return row === this.row && column === this.column;
            },
            set(value) {
                if (value) {
                    this.setEditingCellCoordinates({
                        row: this.row,
                        column: this.column,
                    });
                } else {
                    this.setEditingCellCoordinates();
                }
            },
        },
    },
    mounted() {
        if (!this.locked && !this.disabled) {
            this.$el.addEventListener('dblclick', this.onDblcClick);
        }
    },
    beforeDestroy() {
        if (!this.locked && !this.disabled) {
            this.$el.removeEventListener('dblclick', this.onDblcClick);
        }
    },
    methods: {
        onFocus() {
            this.setFocusedCellCoordinates({
                row: this.row,
                column: this.column,
            });
        },
        onBlur() {
            this.setFocusedCellCoordinates();
        },
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
        onMouseDown() {
            if (this.editKeyCode !== 32 && !this.isEditing) {
                this.isEditing = false;
                this.$emit('edit');
            }
        },
        onKeyDown(event) {
            const {
                keyCode,
            } = event;

            let element;

            if (this.isEditing && keyCode !== this.editKeyCode) {
                if (keyCode === 9) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                return false;
            }

            const tableLayout = this.getTableLayoutElement();

            switch (keyCode) {
            case this.editKeyCode:
                if (!this.locked && !this.disabled) {
                    if (this.editKeyCode !== 32) {
                        element = this.$el;
                        this.isEditing = !this.isEditing;
                    } else {
                        this.$emit('edit');
                    }
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

            if ((keyCode === 13 && !this.isEditing && element) || (keyCode !== 13 && element)) {
                element.focus();
            }

            element = null;

            return true;
        },
        onDblcClick() {
            if (!this.locked && !this.disabled && this.editKeyCode !== 32) {
                this.isEditing = true;
                this.$emit('edit', this.isEditing);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-table-cell {
        position: relative;
        display: flex;
        align-items: center;
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
