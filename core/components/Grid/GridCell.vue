/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :tabindex="-1"
        :class="gridCellClasses"
        @keydown="onKeyDown"
        @focus="onFocus"
        @blur="onBlur">
        <div
            v-if="isResizing"
            class="grid-cell__resizer"
            @mousedown="initResizeDrag" />
        <slot />
    </div>
</template>

<script>

export default {
    name: 'GridCell',
    inject: ['setEditingCellCoordinates'],
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
        disabled: {
            type: Boolean,
            default: false,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        editing: {
            type: Boolean,
            default: false,
        },
        error: {
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
    },
    data() {
        return {
            isResizing: false,
        };
    },
    mounted() {
        if (this.editingAllowed) {
            this.$el.addEventListener('dblclick', this.onDblcClick);
        }
    },
    destroyed() {
        if (this.editingAllowed) {
            this.$el.removeEventListener('dblclick', this.onDblcClick);
        }
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
        onFocus() {
            if (!this.actionCell) {
                this.isResizing = true;
                this.setEditingCellCoordinates();
            }
        },
        onBlur() {
            this.isResizing = false;
        },
        onKeyDown(event) {
            const { keyCode } = event;

            let element;

            if (this.editing && !this.actionCell && keyCode !== 13) {
                if (keyCode === 9) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                return false;
            }

            switch (keyCode) {
            case 13:
                // Key: ENTER
                if (this.editingAllowed) {
                    element = this.$el;

                    if (this.editing) {
                        element.focus();
                        this.$emit('edit', false);
                    } else {
                        this.$emit('edit', true);
                    }
                }
                break;
            case 32:
                // Key: SPACE BAR
                if (this.editingAllowed && this.actionCell) {
                    if (this.editing) {
                        this.$emit('edit', false);
                    } else {
                        this.$emit('edit', true);
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

            if (keyCode !== 13 && element) {
                element.focus();
            }

            return true;
        },
        onDblcClick() {
            if (this.editingAllowed && !this.actionCell) {
                this.$emit('edit', true);
            }
        },
        initResizeDrag() {
            this.addEventListenersForResizeState();
        },
        doResizeDrag(event) {
            console.log('dragging');
        },
        stopResizeDrag(event) {
            console.log('end');
            this.removeEventListenersForResizeState();
        },
        addEventListenersForResizeState() {
            document.documentElement.addEventListener(
                'mousemove',
                this.doResizeDrag,
                false,
            );
            document.documentElement.addEventListener(
                'mouseup',
                this.stopResizeDrag,
                false,
            );
        },
        removeEventListenersForResizeState() {
            document.documentElement.removeEventListener(
                'mousemove',
                this.doResizeDrag,
                false,
            );
            document.documentElement.removeEventListener(
                'mouseup',
                this.stopResizeDrag,
                false,
            );
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-cell {
        position: relative;
        display: flex;
        align-items: center;
        outline: none;
        box-sizing: border-box;
        border-bottom: 1px solid $GREY;
        background-color: $WHITE;

        &:nth-child(1) {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            background-color: $WHITESMOKE;
        }

        &:not(&--error):not(&--locked) {
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

        &--locked:focus {
            box-shadow: inset 0 0 0 2px $GRAPHITE_LIGHT;
        }

        &:focus {
            z-index: $Z_INDEX_LVL_1;
        }

        &__resizer {
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 4px;
            height: 4px;
            border: solid 2px $WHITE;
            background-color: #00BC87;
            cursor: row-resize;
        }
    }
</style>
