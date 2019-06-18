/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :id="layoutElement.data.id"
        :class="['attribute-element', {'layer': !isContextualMenuActive }]"
        :style="gridItemPosition"
        :draggable="isDraggingEnabled"
        @dragenter="onDragEnter"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <div class="horizontal-wrapper">
            <Icon
                size="medium"
                :icon="iconByType" />
            <div class="vertical-wrapper">
                <span
                    :class="[
                        'txt-fixed',
                        'l-spacing--half',
                        'typo-label',
                        'txt--light-graphite',
                        {'attribute-element--required': layoutElement.required}
                    ]"
                    v-text="layoutElement.data.type" />
                <span
                    class="txt-fixed typo-subtitle txt--dark-graphite"
                    v-text="layoutElement.data.label" />
            </div>
            <ButtonSelect
                :icon="contextualMenuStateIcon"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus" />
        </div>
        <div
            class="attribute-element__resizer"
            @mousedown="initDrag" />
    </div>
</template>

<script>
/* eslint-disable camelcase */

import { mapState, mapActions } from 'vuex';
import {
    getHighlightingHintPoints,
    getHoveredPoints,
    getMaxRowForGivenColumn,
    getMaxColumnForGivenRow,
    getRowBasedOnHeight,
    getColumnBasedOnWidth,
} from '~/model/template_designer/layout/LayoutProvider';
import LayoutElementData from '~/model/template_designer/LayoutElementData';
import Coordinates from '~/model/coordinate_system/Coordinates';
import Point from '~/model/coordinate_system/Point';
import GridElementOptionsMixin from '~/mixins/gridElementOptionsMixin';
import Icon from '~/components/Icon/Icon';
import ButtonSelect from '~/components/Inputs/Select/ButtonSelect';

export default {
    name: 'AttributeElement',
    components: {
        Icon,
        ButtonSelect,
    },
    mixins: [GridElementOptionsMixin],
    data: () => ({
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0,
        minWidth: 0,
        minHeight: 0,
        highlightingPoints: [],
        isDraggingEnabled: true,
        actualElementRow: 0,
        actualElementColumn: 0,
        isContextualMenuActive: false,
        contextualMenuItems: ['Require', 'Edit', 'Remove'],
    }),
    computed: {
        ...mapState('templateDesigner', {
            layout: state => state.templateLayout,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
        iconByType() {
            if (!this.layoutElement.data.type) return '';

            const convertedType = this.layoutElement.data.type.toLowerCase().replace('_', '-');

            return `sprite-attribute attribute-${convertedType}`;
        },
        contextualMenuStateIcon() {
            return this.isContextualMenuActive
                ? 'sprite-system system-dots--selected'
                : 'sprite-system system-dots--deactive';
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'addElementToLayoutAtCoordinates',
            'initializeHighlightingHintPoints',
            'initializeHighlightingPositions',
            'setElementRequirement',
            'updateLayoutElementCoordinates',
            'updateObstaclesAtPoints',
        ]),
        ...mapActions('draggable', [
            'setDraggedElement',
        ]),
        onSelectFocus(isFocused) {
            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(value) {
            switch (value) {
            case 'Require':
                this.setElementRequirement({
                    id: this.layoutElement.data.id,
                    required: !this.layoutElement.required,
                });
                break;
            case 'Edit':
                break;
            case 'Remove':
                this.removeElementFromLayout();
                break;
            default: break;
            }
        },
        onDragStart() {
            this.setDraggedElement({ ...this.layoutElement });
        },
        onDragEnd() {
            if (this.draggedElement) {
                this.addElementToLayoutAtCoordinates({
                    elementToAdd: this.draggedElement,
                });
                this.updateObstaclesAtPoints({
                    points: getObstaclePointsForBaseCoordinates(
                        this.draggedElement.coordinates,
                    ),
                    isObstacle: true,
                });
                // Clear cache
                this.setDraggedElement();
                this.initializeHighlightingHoverPoints();
            }
        },
        onDragEnter() {
            if (typeof this.draggedElement === 'object' && this.draggedElement !== null) {
                this.removeElementFromLayout(this.draggedElement);
            }
        },
        removeElementFromLayout(element = null) {
            const { coordinates, sizeRange } = element || this.layoutElement;
            const { xPos, yPos } = coordinates;
            const { minWidth, minHeight } = sizeRange;
            // Replace Element with Placeholder
            this.addElementToLayoutAtCoordinates({
                elementToAdd: new LayoutElementData(
                    new Coordinates(
                        xPos.start,
                        xPos.start + minWidth,
                        yPos.start,
                        yPos.start + minHeight,
                    ),
                    'TemplateGridItem',
                ),
            });
            this.updateObstaclesAtPoints({
                points: getObstaclePointsForBaseCoordinates(
                    coordinates,
                ),
                isObstacle: false,
            });
        },
        initDrag(event) {
            this.isDraggingEnabled = false;
            const { maxWidth, maxHeight } = this.layoutElement.sizeRange;
            const { coordinates } = this.layoutElement;
            const { xPos, yPos } = coordinates;

            this.updateObstaclesAtPoints({
                points: getObstaclePointsForBaseCoordinates(
                    coordinates,
                ),
                isObstacle: false,
            });

            this.highlightingPoints = getHighlightingHintPoints(
                coordinates,
                maxWidth,
                2 * maxHeight - 1,
                this.layout,
            );

            this.initializeHighlightingHintPoints(
                this.highlightingPoints.map(element => (new Point(element.x, element.y))),
            );

            const elementBoundingBox = this.$el.getBoundingClientRect();
            const spacingBetweenColumns = 21;
            const spacingBetweenRows = 41;

            const columnFactor = xPos.end - xPos.start;
            const rowFactor = Math.floor((yPos.end - yPos.start) / 2);

            const realWidthOfElement = elementBoundingBox.width - spacingBetweenColumns
                * (columnFactor - 1);
            const realHeightOfElement = elementBoundingBox.height - spacingBetweenRows * rowFactor;

            this.$el.style.position = 'absolute';
            this.$el.style.width = `${elementBoundingBox.width}px`;
            this.$el.style.height = `${elementBoundingBox.height}px`;
            this.$el.style.resize = 'both';
            this.$el.style.border = '2px solid #00D66C';

            this.startX = event.clientX;
            this.startY = event.clientY;
            this.startWidth = parseInt(
                document.defaultView.getComputedStyle(this.$el).width,
                10,
            );
            this.startHeight = parseInt(
                document.defaultView.getComputedStyle(this.$el).height,
                10,
            );
            this.actualElementRow = yPos.start;
            this.actualElementColumn = xPos.start;
            this.minWidth = realWidthOfElement / columnFactor;
            this.minHeight = realHeightOfElement / (rowFactor + 1);

            document.documentElement.addEventListener(
                'mousemove',
                this.doDrag,
                false,
            );
            document.documentElement.addEventListener(
                'mouseup',
                this.stopDrag,
                false,
            );
        },
        doDrag(event) {
            const { xPos, yPos } = this.layoutElement.coordinates;

            const width = this.startWidth + event.clientX - this.startX;
            const height = this.startHeight + event.clientY - this.startY;

            const column = getColumnBasedOnWidth(width, this.minWidth, xPos);
            const row = getRowBasedOnHeight(height, this.minHeight, yPos);

            const maxColumn = getMaxColumnForGivenRow(
                this.actualElementRow,
                this.highlightingPoints,
            );
            const maxRow = getMaxRowForGivenColumn(
                this.actualElementColumn,
                this.highlightingPoints,
            );

            if (column <= maxColumn) {
                if (width >= this.minWidth) {
                    this.$el.style.width = `${width}px`;
                    this.actualElementColumn = column;
                }
            }

            if (row <= maxRow) {
                if (height >= this.minHeight) {
                    this.$el.style.height = `${height}px`;
                    this.actualElementRow = row;
                }
            }

            const hoveredPoints = getHoveredPoints(
                this.layoutElement.coordinates,
                this.actualElementColumn - xPos.start + 1,
                Math.floor(((this.actualElementRow + 2) - yPos.start) / 2),
            );

            this.initializeHighlightingHoverPoints(hoveredPoints);
        },
        stopDrag() {
            const { xPos, yPos } = this.layoutElement.coordinates;

            const newCoordinates = new Coordinates(
                xPos.start,
                this.actualElementColumn + 1,
                yPos.start,
                this.actualElementRow + 1,
            );

            this.updateLayoutElementCoordinates(
                newCoordinates,
            );

            this.updateObstaclesAtPoints({
                points: getObstaclePointsForBaseCoordinates(
                    newCoordinates,
                ),
                isObstacle: true,
            });

            this.$el.style.border = '1px solid #E0E0E0';
            // Set position back to relative
            this.$el.style.position = 'relative';
            // Set width / height as a null - needed for non-conflicting with grid layout
            this.$el.style.width = null;
            this.$el.style.height = null;

            document.documentElement.removeEventListener(
                'mousemove',
                this.doDrag,
                false,
            );
            document.documentElement.removeEventListener(
                'mouseup',
                this.stopDrag,
                false,
            );
            this.isDraggingEnabled = true;
            // Clear cache
            this.initializeHighlightingHintPoints();
            this.initializeHighlightingHoverPoints();
        },
    },
};
</script>

<style lang="scss" scoped>
    .attribute-element {
        position: relative;
        border: 1px solid $grey;
        min-height: 48px;
        background-color: $background;
        user-select: none;
        cursor: move;
        resize: both;
        overflow: hidden;

        &.layer {
            z-index: 1;
        }

        .horizontal-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
        }

        .vertical-wrapper {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            margin: 0 8px;
        }

        &--required::after {
            position: absolute;
            color: $error;
            content: "*";
        }

        &__resizer {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            cursor: se-resize;
        }
    }
</style>
