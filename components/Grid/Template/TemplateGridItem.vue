/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VDroppable
        v-visible="!layoutElement.isObstacle"
        :class="[
            'item',
            { 'item--hovered' : !isDraggedElementColliding && isHovered },
            { 'item--highlighted' : !isHovered && isHighlighted },
            { 'item--colliding' : isColliding },
        ]"
        :style="gridItemPosition"
        :index="indexPath"
        :on-dropped-component="onDroppedComponent"
        @isHovered="onHover" />
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gridElementOptionsMixin from '~/mixins/gridElementOptionsMixin';
import {
    isDraggedElementColliding,
    getHoveredPoints,
    getObstaclePointsForBaseCoordinates,
} from '~/model/template_designer/layout/LayoutProvider';
import Coordinates from '~/model/coordinate_system/Coordinates';
import AttributeElementData from '~/model/template_designer/AttributeElementData';
import AttributeData from '~/model/template_designer/AttributeData';
import SizeRange from '~/model/coordinate_system/SizeRange';

export default {
    name: 'TemplateGridItem',
    components: {
        VDroppable: () => import('~/components/DragAndDrop/VDroppable'),
    },
    mixins: [gridElementOptionsMixin],
    computed: {
        ...mapGetters('templateDesigner', [
            'attributeTypeData',
            'layoutElementByID',
        ]),
        ...mapGetters('list', [
            'elementByCode',
        ]),
        ...mapState('templateDesigner', {
            layout: state => state.templateLayout,
            highlightingHintPoints: state => state.highlightingHintPoints,
            highlightingHoverPoints: state => state.highlightingHoverPoints,
            isDraggedElementColliding: state => state.isDraggedElementColliding,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
        indexPath() {
            const { xPos, yPos } = this.layoutElement.coordinates;

            return {
                x: xPos.start,
                y: yPos.start,
            };
        },
        isHighlighted() {
            return this.highlightingHintPoints.find(
                point => point.x === this.indexPath.x && point.y === this.indexPath.y,
            );
        },
        isHovered() {
            return this.highlightingHoverPoints.find(
                point => point.x === this.indexPath.x && point.y === this.indexPath.y,
            );
        },
        isColliding() {
            return this.isDraggedElementColliding && this.isHovered;
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'addElementToLayoutAtCoordinates',
            'addElementToHoveredAtPointIfNeeded',
            'updateObstaclesAtPoints',
            'initializeHighlightingHoverPoints',
            'initializeDraggedElementCollision',
        ]),
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggedElementProperty',
        ]),
        onHover(isHovered) {
            const { xPos, yPos } = this.layoutElement.coordinates;
            if (isHovered) {
                // TODO: Check if element is obstacle
                // TODO: Check if element is out of bounds

                let width = 1;
                let height = 1;
                if (this.draggedElement.coordinates) {
                    const {
                        xPos: xPosDraggedElement,
                        yPos: yPosDraggedElement,
                    } = this.draggedElement.coordinates;

                    height = yPosDraggedElement.end - yPosDraggedElement.start;
                    width = xPosDraggedElement.end - xPosDraggedElement.start;
                }

                const newCoordinatesOfDraggedElement = new Coordinates(
                    xPos.start,
                    xPos.start + width,
                    yPos.start,
                    yPos.start + height,
                );

                this.initializeDraggedElementCollision(
                    isDraggedElementColliding(
                        newCoordinatesOfDraggedElement,
                        this.layout,
                    ),
                );

                this.initializeHighlightingHoverPoints(
                    getHoveredPoints(
                        newCoordinatesOfDraggedElement,
                        width,
                        height - Math.floor(height / 2), // normalize height
                    ),
                );
            } else {
                this.initializeHighlightingHoverPoints();
            }
        },
        onDroppedComponent(componentData, { x, y }) {
            // We cannot drop component on collision detected
            if (this.isDraggedElementColliding) {
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
                return;
            }

            // Element might be bigger than 1/1 sizes
            let widthOfElement = 1;
            let heightOfElement = 1;

            if (this.draggedElement.coordinates) {
                const { xPos, yPos } = this.draggedElement.coordinates;

                heightOfElement = yPos.end - yPos.start;
                widthOfElement = xPos.end - xPos.start;
                // Add layout element into new position
                const newCoordinates = new Coordinates(
                    x,
                    x + widthOfElement,
                    y,
                    y + heightOfElement,
                );

                this.setDraggedElementProperty({ propName: 'coordinates', value: newCoordinates });

                this.addElementToLayoutAtCoordinates({
                    elementToAdd: this.draggedElement,
                });

                this.updateObstaclesAtPoints({
                    points: getObstaclePointsForBaseCoordinates(
                        newCoordinates,
                    ),
                    isObstacle: true,
                });
            } else {
                const attribute = this.elementByCode(componentData.split(':')[0]);
                const { type } = attribute;
                const {
                    min_width: minWidth,
                    min_height: minHeight,
                    max_width: maxWidth,
                    max_height: maxHeight,
                } = this.attributeTypeData(type);
                const elementToAdd = new AttributeElementData(
                    new AttributeData(
                        attribute.id,
                        attribute.type,
                        attribute.label,
                    ),
                    false,
                    new SizeRange(
                        minWidth,
                        minHeight,
                        maxWidth,
                        maxHeight,
                    ),
                    new Coordinates(
                        x,
                        x + widthOfElement,
                        y,
                        y + heightOfElement,
                    ),
                    'AttributeElement',
                );

                this.addElementToLayoutAtCoordinates({
                    elementToAdd,
                });
            }

            // Clear cache
            this.setDraggedElement();
            this.initializeHighlightingHoverPoints();
        },
    },
};
</script>

<style lang="scss" scoped>
    .item {
        position: relative;
        height: 48px;
        border: 2px dashed $grey;
        box-sizing: border-box;
        transition:
            background-color 0.2s ease-out,
            border 0.2s ease-out;

        &--hovered {
            border: 2px dashed $success;
            background-color: lighten($success, 60%);
        }

        &--highlighted {
            border: 2px dashed $warning;
            background-color: lighten($warning, 60%);
        }

        &--colliding {
            border: 2px dashed $error;
            background-color: lighten($error, 60%);
        }
    }
</style>
