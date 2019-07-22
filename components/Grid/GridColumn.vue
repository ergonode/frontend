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
        <div
            class="column__resizer"
            @mousedown="initResizeDrag" />
    </div>
</template>
<script>
import { mapActions } from 'vuex';

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
            startWidth: 0,
            startX: 0,
            minWidth: this.column.width,
            columnWidth: null,
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
    methods: {
        ...mapActions('grid', [
            'updateColumnWidthAtIndex',
        ]),
        initResizeDrag(event) {
            this.initMousePosition(event);
            this.initElementWidth();
            this.initElementStyleForResizeState();
            this.addEventListenersForResizeState();
        },
        doResizeDrag(event) {
            const { clientX } = event;
            const width = this.getElementWidthBasedOnMouseXPosition(clientX);

            if (width > this.minWidth) {
                this.columnWidth = width;
                this.updateElementWidth(width);
            }
        },
        stopResizeDrag() {
            this.updateColumnWidthAtIndex({ index: this.index, width: this.columnWidth });
            this.removeEventListenersForResizeState();
        },
        initMousePosition({ clientX }) {
            this.startX = clientX;
        },
        initElementWidth() {
            const {
                width: elementWidth,
            } = this.$el.getBoundingClientRect();

            this.startWidth = parseInt(elementWidth, 10);
        },
        initElementStyleForResizeState() {
            this.$el.style.width = `${this.startWidth}px`;
        },
        getElementWidthBasedOnMouseXPosition(xPos) {
            return this.startWidth + xPos - this.startX;
        },
        updateElementWidth(width) {
            this.$el.style.width = `${width}px`;
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
    .column {
        position: relative;
        display: grid;
        padding-right: 1px;
        min-width: min-content;

        &::before {
            position: absolute;
            top: 0;
            right: 0;
            width: 1px;
            height: 100%;
            background-color: $grey;
            opacity: 0;
            content: "";
        }

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
            opacity: 0;
            pointer-events: none;
            content: "";
        }

        &--border-right {
            &::before {
                opacity: 1;
            }
        }

        &.hover {
            z-index: 3;

            &::after {
                opacity: 1;
            }
        }

        &__resizer {
            position: absolute;
            top: 0;
            right: 1px;
            width: 5px;
            height: 100%;
            cursor: col-resize;
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
