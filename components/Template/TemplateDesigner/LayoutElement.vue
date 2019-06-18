/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div
        class="layout-element"
        :draggable="isDraggingEnabled"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut">
        <div class="horizontal-wrapper">
            <div class="layout-element__icon">
                <Icon
                    size="medium"
                    :icon="iconByType" />
            </div>
            <div class="vertical-wrapper">
                <span
                    :class="[
                        { 'layout-element--required': element.required },
                        'txt--light-graphite',
                        'typo-label',
                        'l-spacing--half',
                        'txt-fixed',
                    ]"
                    v-text="element.type" />
                <span
                    class="txt--dark-graphite typo-subtitle txt-fixed "
                    v-text="element.label || 'No translation'" />
            </div>
            <ButtonSelect
                :class="['layout-element__contextual-menu', contextualMenuHoveStateClasses]"
                :icon="contextualMenuStateIcon"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus" />
            <div
                class="layout-element__resizer"
                @mousedown="initResizeDrag" />
        </div>
    </div>
</template>

<script>

import {
    getHighlightingHintPoints,
    getMaxRowForGivenColumn,
    getMaxColumnForGivenRow,
    getRowBasedOnHeight,
    getColumnBasedOnWidth,
} from '~/model/template_designer/layout/LayoutProvider';
import {
    addGhostElementToDraggableLayer,
    updateGhostElementWidth,
    updateGhostElementHeight,
    removeGhostElementFromDraggableLayer,
} from '~/model/template_designer/layout/GhostElement';
import { mapState, mapActions } from 'vuex';
import Icon from '~/components/Icon/Icon';
import ButtonSelect from '~/components/Inputs/Select/ButtonSelect';

export default {
    name: 'LayoutElement',
    props: {
        index: {
            type: Number,
            required: true,
        },
        element: {
            type: Object,
            required: true,
        },
    },
    components: {
        Icon,
        ButtonSelect,
    },
    data() {
        return {
            isDraggingEnabled: true,
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0,
            minWidth: 0,
            minHeight: 0,
            newWidth: 0,
            newHeight: 0,
            actualElementRow: 0,
            actualElementColumn: 0,
            highlightingPoints: [],
            elementsGap: 16,
            isContextualMenuActive: false,
            contextualMenuItems: ['Require', 'Remove'],
            isHovered: false,
        };
    },
    computed: {
        ...mapState('templateDesigner', {
            layoutElements: state => state.layoutElements,
        }),
        iconByType() {
            const { type } = this.element;
            const convertedType = type.toLowerCase().replace('_', '-');

            return `sprite-attribute attribute-${convertedType}`;
        },
        contextualMenuHoveStateClasses() {
            return { 'layout-element__contextual-menu--hovered': this.isHovered };
        },
        contextualMenuStateIcon() {
            return this.isContextualMenuActive
                ? 'sprite-system system-dots--selected'
                : 'sprite-system system-dots--deactive';
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'updateLayoutElementBounds',
            'updateLayoutElementPosition',
            'setLayoutElementRequirement',
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('draggable', [
            'setDraggedElement',
        ]),
        onMouseOver() {
            this.isHovered = true;
        },
        onMouseOut() {
            if (!this.isContextualMenuActive) this.isHovered = false;
        },
        onDragStart() {
            this.setDraggedElement({ ...this.element, index: this.index });
        },
        onDragEnd() {
            this.setDraggedElement();
        },
        initResizeDrag(event) {
            const {
                row,
                column,
                width,
                height,
                maxWidth,
                maxHeight,
            } = this.element;
            const {
                clientX,
                clientY,
            } = event;
            const {
                width: elementWidth,
                height: elementHeight,
            } = this.$el.getBoundingClientRect();

            this.highlightingPoints = getHighlightingHintPoints(
                {
                    row,
                    column,
                    maxWidth,
                    maxHeight,
                },
                this.layoutElements,
            );

            this.newWidth = width;
            this.newHeight = height;
            this.isDraggingEnabled = false;
            this.startX = clientX;
            this.startY = clientY;
            this.startWidth = parseInt(
                elementWidth,
                10,
            );
            this.startHeight = parseInt(
                elementHeight,
                10,
            );
            this.actualElementRow = row;
            this.actualElementColumn = column;
            this.$el.style.position = 'absolute';
            this.$el.style.width = `${this.startWidth}px`;
            this.$el.style.height = `${this.startHeight}px`;
            this.$el.style.border = '2px solid #00bc87';

            addGhostElementToDraggableLayer({
                top: this.$el.offsetTop,
                left: this.$el.offsetLeft,
                width: this.startWidth,
                height: this.startHeight,
            });

            this.minWidth = (this.startWidth - (this.elementsGap * (width - 1))) / width;
            this.minHeight = (this.startHeight - (this.elementsGap * (height - 1))) / height;

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

            this.$emit('highlightedPositionChange', this.highlightingPoints);
        },
        doResizeDrag(event) {
            const { row, column } = this.element;
            const width = this.startWidth + event.clientX - this.startX;
            const height = this.startHeight + event.clientY - this.startY;
            const columnBellowMouse = getColumnBasedOnWidth(width, this.minWidth, column);
            const rowBellowMouse = getRowBasedOnHeight(height, this.minHeight, row);
            const maxColumn = getMaxColumnForGivenRow(
                this.actualElementRow,
                this.highlightingPoints,
            );
            const maxRow = getMaxRowForGivenColumn(
                this.actualElementColumn,
                this.highlightingPoints,
            );

            if (width >= this.minWidth && columnBellowMouse <= maxColumn) {
                this.newWidth = columnBellowMouse - column + 1;

                if (columnBellowMouse !== this.actualElementColumn) {
                    const gapsValue = this.elementsGap * (this.newWidth - 1);
                    const ghostElementWidth = this.minWidth * this.newWidth
                        + gapsValue;

                    updateGhostElementWidth(ghostElementWidth);
                }

                this.$el.style.width = `${width}px`;
                this.actualElementColumn = columnBellowMouse;
            }

            if (height >= this.minHeight && rowBellowMouse <= maxRow) {
                this.newHeight = rowBellowMouse - row + 1;

                if (rowBellowMouse !== this.actualElementRow) {
                    const gapsValue = this.elementsGap * (this.newHeight - 1);
                    const ghostElementHeight = this.minHeight * this.newHeight
                        + gapsValue;

                    updateGhostElementHeight(ghostElementHeight);
                }

                this.$el.style.height = `${height}px`;
                this.actualElementRow = rowBellowMouse;
            }
        },
        stopResizeDrag() {
            this.$el.style.border = '1px solid #d6d7d8';
            this.$el.style.position = 'relative';
            this.$el.style.width = null;
            this.$el.style.height = null;

            this.updateLayoutElementBounds({
                index: this.index,
                width: this.newWidth,
                height: this.newHeight,
            });

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
            this.isDraggingEnabled = true;
            this.highlightingPoints = [];

            removeGhostElementFromDraggableLayer();

            this.$emit('highlightedPositionChange', []);
        },
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(value) {
            switch (value) {
            case 'Require':
                this.setLayoutElementRequirement({
                    index: this.index,
                    required: !this.element.required,
                });
                break;
            case 'Remove':
                this.removeLayoutElementAtIndex();
                break;
            default: break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .layout-element {
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border: 1px solid $grey;
        margin: 8px;
        box-sizing: border-box;
        background-color: $background;
        user-select: none;
        cursor: grab;

        .horizontal-wrapper {
            z-index: 5;
            display: flex;
            flex: 1;
            height: 100%;
            padding-left: 10px;
            background-color: $background;
            overflow: hidden;
            resize: both;
        }

        .vertical-wrapper {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 8px;
        }

        &__icon {
            display: flex;
            padding-top: 12px;
        }

        &__contextual-menu {
            flex: 0;
            opacity: 0;

            &--hovered {
                opacity: 1;
            }
        }

        &__resizer {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            cursor: se-resize;
        }

        &--required::after {
            position: absolute;
            color: $error;
            content: "*";
        }
    }
</style>
