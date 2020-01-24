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
        <template v-if="copyable">
            <div
                class="grid-cell__resizer"
                @mousedown="initResizeDrag" />
            <div
                v-if="isResizing"
                ref="resizerBorder"
                class="grid-cell__resizer-border" />
        </template>
        <slot :is-editing="isEditing" />
    </div>
</template>

<script>

const registerResizeEventListenersModule = () => import('~/model/resize/registerResizeEventListeners');
const unregisterResizeEventListenersModule = () => import('~/model/resize/unregisterResizeEventListeners');

export default {
    name: 'GridCell',
    inject: ['getEditingCellCoordinates', 'setEditingCellCoordinates'],
    props: {
        spacebarEdition: {
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
    },
    data() {
        return {
            isResizing: false,
            isFocused: false,
            startY: 0,
            startHeight: 0,
            currentHeight: 0,
        };
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
    methods: {
        onMouseDown() {
            if (!this.spacebarEdition && !this.isEditing) {
                this.isEditing = false;
                this.$emit('edit', this.isEditing);
            }
        },
        onKeyDown(event) {
            const { keyCode } = event;

            let element;

            if (this.isEditing && !this.spacebarEdition && keyCode !== 13) {
                if (keyCode === 9) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                return false;
            }

            const gridBodyEl = document.documentElement.querySelector('.grid__body');

            switch (keyCode) {
            case 13:
                // Key: ENTER
                if (!this.locked && !this.disabled) {
                    element = this.$el;

                    this.isEditing = !this.isEditing;
                    this.$emit('edit', this.isEditing);
                }
                break;
            case 32:
                // Key: SPACE BAR
                if (!this.locked && !this.disabled && this.spacebarEdition) {
                    this.isEditing = !this.isEditing;
                    this.$emit('edit', this.isEditing);
                }
                break;
            case 37:
                // Key: LEFT
                element = gridBodyEl.querySelector(`.coordinates-${this.column - 1}-${this.row}`);
                break;
            case 38:
                // Key: UP
                element = gridBodyEl.querySelector(`.coordinates-${this.column}-${this.row - 1}`);
                break;
            case 39:
            case 9:
                // Key: RIGHT || TAB
                element = gridBodyEl.querySelector(`.coordinates-${this.column + 1}-${this.row}`);
                if (!element) {
                    // We get out of bounds - go to the next line
                    element = gridBodyEl.querySelector(`.coordinates-0-${this.row + 1}`);
                }
                break;
            case 40:
                // Key: DOWN
                element = gridBodyEl.querySelector(`.coordinates-${this.column}-${this.row + 1}`);
                break;
            default: break;
            }

            event.preventDefault();

            if (element && (keyCode === 9 || keyCode === 40 || keyCode === 38)) {
                const isElementInsideViewPort = element.offsetTop + element.offsetHeight
                    > gridBodyEl.offsetHeight + gridBodyEl.scrollTop;
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
            if (!this.locked && !this.disabled && !this.spacebarEdition) {
                this.isEditing = true;
                this.$emit('edit', this.isEditing);
            }
        },
        initResizeDrag(event) {
            const { pageY } = event;
            this.isResizing = true;
            this.startY = pageY;
            this.startHeight = parseInt(this.$el.getBoundingClientRect().height, 10);
            this.currentHeight = this.startHeight;

            registerResizeEventListenersModule().then((response) => {
                response.default(this.doResizeDrag, this.stopResizeDrag);
            });
        },
        doResizeDrag(event) {
            const { pageY } = event;
            const height = this.startHeight + pageY - this.startY;
            const factor = Math.ceil(height / this.startHeight);
            const fixedHeight = factor * this.startHeight;

            if (fixedHeight !== this.currentHeight) {
                if (height < 0) {
                    this.$refs.resizerBorder.style.height = `${-1 * fixedHeight + 2 * this.startHeight}px`;
                    this.$refs.resizerBorder.classList.add('grid-cell__resizer-border--negative-height');
                } else {
                    this.$refs.resizerBorder.style.height = `${fixedHeight}px`;
                    this.$refs.resizerBorder.classList.remove('grid-cell__resizer-border--negative-height');
                }

                this.currentHeight = fixedHeight;

                // TODO: It's not optimized form - gotta think about better solution
                // const element = document.querySelector(`.coordinates-${this.column}-${this.row + factor}`);
                // if (element) {
                //     element.scrollIntoView(false);
                // }
            }
        },
        stopResizeDrag() {
            const factor = Math.ceil(this.currentHeight / this.startHeight) - 1;

            this.isResizing = false;
            this.$refs.resizerBorder.style.height = null;
            this.$refs.resizerBorder.classList.remove('grid-cell__resizer-border--negative-height');
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

            unregisterResizeEventListenersModule().then((response) => {
                response.default(this.doResizeDrag, this.stopResizeDrag);
            });
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
            box-sizing: border-box;

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
