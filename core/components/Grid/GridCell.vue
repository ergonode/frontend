/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :tabindex="-1"
        :class="gridCellClasses"
        @mousedown="onMouseDown"
        @keydown="onKeyDown">
        <div
            class="grid-cell__resizer"
            @mousedown="initResizeDrag" />
        <div
            v-if="isResizing"
            ref="resizerBorder"
            class="grid-cell__resizer-border" />
        <slot :is-editing="isEditing" />
    </div>
</template>

<script>

export default {
    name: 'GridCell',
    inject: ['getEditingCellCoordinates', 'setEditingCellCoordinates'],
    props: {
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
            isFocused: false,
            startY: 0,
            startHeight: 0,
        };
    },
    mounted() {
        if (!this.locked) {
            this.$el.addEventListener('dblclick', this.onDblcClick);
        }
    },
    destroyed() {
        if (!this.locked) {
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
    methods: {
        onMouseDown() {
            if (!this.actionCell && !this.isEditing) {
                this.isEditing = false;
                this.$emit('edit', this.isEditing);
            }
        },
        onKeyDown(event) {
            const { keyCode } = event;

            let element;

            if (this.isEditing && !this.actionCell && keyCode !== 13) {
                if (keyCode === 9) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                return false;
            }

            switch (keyCode) {
            case 13:
                // Key: ENTER
                if (!this.locked) {
                    element = this.$el;

                    this.isEditing = !this.isEditing;
                    this.$emit('edit', this.isEditing);
                }
                break;
            case 32:
                // Key: SPACE BAR
                if (!this.locked && this.actionCell) {
                    this.isEditing = !this.isEditing;
                    this.$emit('edit', this.isEditing);
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

            if (element && (keyCode === 9 || keyCode === 40 || keyCode === 38)) {
                element.scrollIntoView(false);
            }

            if ((keyCode === 13 && !this.isEditing && element) || (keyCode !== 13 && element)) {
                element.focus();
            }

            return true;
        },
        onDblcClick() {
            if (!this.locked && !this.actionCell) {
                this.isEditing = true;
                this.$emit('edit', this.isEditing);
            }
        },
        initResizeDrag(event) {
            const { pageY } = event;
            this.isResizing = true;
            this.startY = pageY;
            this.startHeight = parseInt(this.$el.getBoundingClientRect().height, 10);
            this.addEventListenersForResizeState();
        },
        doResizeDrag(event) {
            const { pageY } = event;
            const height = this.startHeight + pageY - this.startY;
            const factor = Math.ceil(height / this.startHeight);
            const fixedHeight = factor * this.startHeight;
            if (height < 0) {
                this.$refs.resizerBorder.style.height = `${-1 * fixedHeight - 4 + this.startHeight}px`;
                this.$refs.resizerBorder.classList.add('grid-cell__resizer-border--negative-height');
            } else {
                this.$refs.resizerBorder.style.height = `${fixedHeight - 4}px`;
                this.$refs.resizerBorder.classList.remove('grid-cell__resizer-border--negative-height');
            }

            // const element = document.querySelector(`.coordinates-${this.column}-${this.row + factor}`);
            // if (element) {
            //     element.scrollIntoView(false);
            // }
        },
        stopResizeDrag() {
            // TODO: Emit copy event
            this.isResizing = false;
            this.$refs.resizerBorder.style.height = null;
            this.$refs.resizerBorder.classList.remove('grid-cell__resizer-border--negative-height');
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
        $cell: &;

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

        &__resizer {
            position: absolute;
            left: 50%;
            bottom: -3px;
            transform: translate(-50%, 0);
            z-index: $Z_INDEX_LVL_1;
            display: none;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background-color: #00BC87;
            cursor: row-resize;
        }

        &__resizer-border {
            position: absolute;
            left: 0;
            right: 0;
            z-index: $Z_INDEX_LVL_1;
            height: 100%;
            border: $BORDER_2_DASHED_GREEN;

            &--negative-height {
                bottom: 0;
            }

            &:not(&--negative-height) {
                top: 0;
            }
        }

        &:focus {
            #{$cell}__resizer {
                display: inline-block;
            }
        }
    }
</style>
