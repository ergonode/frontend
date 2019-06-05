/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div
        :tabindex="0"
        :class="gridCellClasses"
        @keydown="onKeyDown"
        @dblclick="onDblcClick">
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
        onEdit: {
            type: Function,
            required: true,
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
    methods: {
        onKeyDown(event) {
            const { keyCode } = event;

            let element;

            if (!event.target.classList.contains('grid-cell') && !this.actionCell && keyCode !== 13 && keyCode !== 9) {
                return false;
            }

            switch (keyCode) {
            case 13:
                // Key: ENTER
                if (this.editingAllowed) {
                    element = this.$el;
                    if (!event.target.classList.contains('grid-cell') || event.target.classList.contains('grid-cell--selected')) {
                        element.focus();
                        this.onEdit(false);
                    } else {
                        this.onEdit(true);
                    }
                }
                break;
            case 37:
                // Key: LEFT
                element = document.querySelector(`.coordinates-${this.column - 1}-${this.row}`);
                break;
            case 38:
                // Key: UP
                element = document.querySelector(`.coordinates-${this.column}-${this.row - 1}`);
                break;
            case 39:
            case 9:
                // Key: RIGHT || TAB
                element = document.querySelector(`.coordinates-${this.column + 1}-${this.row}`);
                if (!element) {
                    // We get out of bounds - go to the next line
                    element = document.querySelector(`.coordinates-0-${this.row + 1}`);
                }
                break;
            case 40:
                // Key: DOWN
                element = document.querySelector(`.coordinates-${this.column}-${this.row + 1}`);
                break;
            default: break;
            }

            event.preventDefault();

            if (keyCode !== 13) {
                if (element) {
                    element.focus();
                }
            }

            return true;
        },
        onDblcClick() {
            this.onEdit(true);
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
