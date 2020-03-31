/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :tabindex="-1"
        :class="gridCellClasses"
        @mousedown="onMouseDown"
        @keydown="onKeyDown"
        @focus="onFocus"
        @blur="onBlur"
        @resizeend="onResizeEnd">
        <slot :is-editing="isEditing" />
    </div>
</template>

<script>

const cellResizer = () => import('@Core/models/resize/grid/cellResizer');

export default {
    name: 'GridCell',
    inject: ['getEditingCellCoordinates', 'setEditingCellCoordinates'],
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
        gridCellClasses() {
            return [
                'grid-cell',
                `coordinates-${this.column}-${this.row}`,
                {
                    'grid-cell--error': this.error,
                    'grid-cell--locked': this.locked,
                    'grid-cell--selected': this.selected,
                    'grid-cell--draft': this.draft,
                    'grid-cell--disabled': this.disabled,
                },
            ];
        },
        isEditing: {
            get() {
                const { row, column } = this.getEditingCellCoordinates();

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
    destroyed() {
        if (!this.locked && !this.disabled) {
            this.$el.removeEventListener('dblclick', this.onDblcClick);
        }
    },
    methods: {
        onFocus() {
            if (this.copyable) {
                cellResizer().then((response) => {
                    response.bind(this.$el);
                });
            }
        },
        onResizeEnd(event) {
            this.$emit('copy', {
                from: {
                    row: this.row,
                    column: this.column,
                },
                to: {
                    row: this.row + event.detail,
                    column: this.column,
                },
            });
        },
        onBlur() {
            if (this.copyable) {
                cellResizer().then((response) => {
                    response.unbind(this.$el);
                });
            }
        },
        onMouseDown() {
            if (this.editKeyCode !== 32 && !this.isEditing) {
                this.isEditing = false;
                this.$emit('edit', this.isEditing);
            }
        },
        onKeyDown(event) {
            const { keyCode } = event;

            let element;

            if (this.isEditing && keyCode !== this.editKeyCode) {
                if (keyCode === 9) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                return false;
            }

            const gridColumnsEl = document.documentElement.querySelector('.grid__columns');

            switch (keyCode) {
            case this.editKeyCode:
                if (!this.locked && !this.disabled) {
                    if (this.editKeyCode !== 32) {
                        element = this.$el;
                        this.isEditing = !this.isEditing;
                    }

                    this.$emit('edit', this.isEditing);
                }
                break;
            case 37:
                // Key: LEFT
                element = gridColumnsEl.querySelector(`.coordinates-${this.column - 1}-${this.row}`);
                break;
            case 38:
                // Key: UP
                element = gridColumnsEl.querySelector(`.coordinates-${this.column}-${this.row - 1}`);
                break;
            case 39:
            case 9:
                // Key: RIGHT || TAB
                element = gridColumnsEl.querySelector(`.coordinates-${this.column + 1}-${this.row}`);
                if (!element) {
                    // We get out of bounds - go to the next line
                    element = gridColumnsEl.querySelector(`.coordinates-0-${this.row + 1}`);
                }
                break;
            case 40:
                // Key: DOWN
                element = gridColumnsEl.querySelector(`.coordinates-${this.column}-${this.row + 1}`);
                break;
            default: break;
            }

            event.preventDefault();

            if (element && (keyCode === 9 || keyCode === 40 || keyCode === 38)) {
                const isElementInsideViewPort = element.offsetTop + element.offsetHeight
                    > gridColumnsEl.offsetHeight + gridColumnsEl.scrollTop;
                if (isElementInsideViewPort) {
                    element.scrollIntoView(false);
                }
            }

            if ((keyCode === 13 && !this.isEditing && element) || (keyCode !== 13 && element)) {
                element.focus();
            }

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
    .grid-cell {
        display: flex;
        align-items: center;
        outline: none;
        box-sizing: border-box;
        border-bottom: 1px solid $GREY;
        cursor: pointer;

        &:not(&--error):not(&--locked):not(&--disabled) {
            &:focus {
                box-shadow: inset 0 0 0 2px $GREEN;
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
