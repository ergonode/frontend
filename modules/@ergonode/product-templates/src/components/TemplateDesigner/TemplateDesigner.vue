/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Designer
        :columns="columns"
        :last-item-row="lastItemRow"
        @rows="onRowsChange">
        <template #backgroundItem="{ row, column }">
            <TemplateDesignerBackgroundItem
                :key="`${column} | ${row}`"
                :highlighting-positions="highlightedPositions"
                :column="column"
                :row="row" />
        </template>
        <template #appendBody="{ rows, layerStyle }">
            <DesignerDraggableLayer
                ref="designerDraggableLayer"
                :style="layerStyle"
                @dragover.native="onDragOver"
                @dragleave.native="onDragLeave"
                @drop.native="onDrop">
                <DesignerPlaceholderItem
                    v-if="!layoutElements.length && !highlightedPositions.length"
                    :width="1" />
                <DesignerGhostItem
                    v-if="ghostIndex !== -1"
                    v-bind="{ ...ghostItemBounds }" />
                <LayoutElement
                    v-for="(element, index) in layoutElements"
                    :key="`${element.row}/${element.column}`"
                    :index="index"
                    :element="element"
                    :layout-width="columns"
                    :layout-height="rows"
                    :disabled="!isAllowedToUpdate"
                    @highlighted-position-change="onHighlightedPositionsChange"
                    @remove="onRemoveLayoutElement">
                    <template #content>
                        <AttributeElementContent
                            v-if="element.type !== sectionType"
                            :element="element"
                            :disabled="!isAllowedToUpdate"
                            :index="index" />
                        <SectionElementContent
                            v-else
                            :element="element"
                            :index="index"
                            :disabled="!isAllowedToUpdate"
                            @edit-title="onEditSectionTitle" />
                    </template>
                </LayoutElement>
            </DesignerDraggableLayer>
            <SectionTemplateModalForm
                v-if="isSectionAdded"
                :index="sectionIndex"
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                :position="sectionPosition"
                :element="sectionElement"
                @close="onCloseSectionModal" />
        </template>
    </Designer>
</template>

<script>
import {
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    getMaxValueObject,
} from '@Core/models/arrayWrapper';
import {
    isObject,
} from '@Core/models/objectWrapper';
import AttributeElementContent from '@Templates/components/TemplateDesigner/ProductDesigner/AttributeElementContent';
import LayoutElement from '@Templates/components/TemplateDesigner/ProductDesigner/LayoutElement';
import SectionElementContent from '@Templates/components/TemplateDesigner/ProductDesigner/SectionElementContent';
import TemplateDesignerBackgroundItem from '@Templates/components/TemplateDesigner/TemplateDesignerBackgroundItem';
import PRIVILEGES from '@Templates/config/privileges';
import {
    getHighlightingLayoutDropPositions,
} from '@Templates/models/layout/LayoutCalculations';
import Designer from '@UI/components/Designer/Designer';
import DesignerDraggableLayer from '@UI/components/Designer/DesignerDraggableLayer';
import DesignerGhostItem from '@UI/components/Designer/DesignerGhostItem';
import DesignerPlaceholderItem from '@UI/components/Designer/DesignerPlaceholderItem';
import {
    getPositionForBrowser,
    isMouseOutOfBoundsElement,
} from '@UI/models/dragAndDrop/helpers';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateDesigner',
    components: {
        Designer,
        DesignerDraggableLayer,
        DesignerGhostItem,
        TemplateDesignerBackgroundItem,
        LayoutElement,
        DesignerPlaceholderItem,
        AttributeElementContent,
        SectionElementContent,
        SectionTemplateModalForm: () => import('@Templates/components/Modals/SectionTemplateModalForm'),
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            rowsCount: 0,
            highlightedPositions: [],
            isSectionAdded: false,
            sectionPosition: null,
            sectionIndex: null,
            sectionElement: null,
            columns: 4,
        };
    },
    computed: {
        ...mapState('productTemplate', [
            'layoutElements',
        ]),
        ...mapState('draggable', [
            'draggedElement',
            'ghostIndex',
            'isElementDragging',
        ]),
        lastItemRow() {
            const layoutElement = getMaxValueObject(this.layoutElements, 'row');

            if (!layoutElement) {
                return 0;
            }

            const {
                row,
                height,
            } = layoutElement;

            return row + height;
        },
        sectionType() {
            return SYSTEM_TYPES.SECTION;
        },
        ghostItemBounds() {
            const {
                row,
                column,
            } = this.ghostIndex;

            let width = 1;
            let height = 1;

            if (isObject(this.draggedElement)) {
                width = this.draggedElement.width;
                height = this.draggedElement.height;
            }

            return {
                row,
                column,
                width,
                height,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
        },
    },
    watch: {
        isElementDragging() {
            if (this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE) {
                return false;
            }

            if (this.isElementDragging === DRAGGED_ELEMENT.LIST) {
                this.highlightedPositions = getHighlightingLayoutDropPositions({
                    draggedElWidth: 1,
                    draggedElHeight: 1,
                    layoutWidth: this.columns,
                    layoutHeight: this.rowsCount,
                    layoutElements: this.layoutElements,
                });

                console.log(this.highlightedPositions);
            } else {
                this.highlightedPositions = [];
            }

            return true;
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        ...mapActions('productTemplate', [
            'addListElementToLayout',
            'updateLayoutElementAtIndex',
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onDragOver(event) {
            event.preventDefault();

            const backgroundItem = this.getBackgroundItem(event);

            if (backgroundItem) {
                const {
                    row,
                    column,
                } = backgroundItem;

                if (this.ghostIndex === -1
                    || (row !== this.ghostIndex.row || column !== this.ghostIndex.column)) {
                    this.__setState({
                        key: 'ghostIndex',
                        value: {
                            row,
                            column,
                        },
                    });
                }
            }
        },
        onDragLeave(event) {
            if (this.isOutOfBounds(event) && this.ghostIndex !== -1) {
                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
        onDrop(event) {
            event.preventDefault();

            if (this.ghostIndex !== -1) {
                this.updateLayoutElement({
                    draggableId: event.dataTransfer.getData('text/plain'),
                    position: {
                        ...this.ghostIndex,
                    },
                });

                this.__setState({
                    key: 'ghostIndex',
                    value: -1,
                });
            }
        },
        onRowsChange(rows) {
            this.rowsCount = rows;
        },
        onHighlightedPositionsChange(positions) {
            this.highlightedPositions = positions;
        },
        updateLayoutElement({
            position,
            draggableId,
        }) {
            this.highlightedPositions = [];

            if (isObject(this.draggedElement)) {
                const index = this.layoutElements.findIndex(
                    el => el.id === this.draggedElement.id,
                );

                this.updateLayoutElementAtIndex({
                    index,
                    element: {
                        ...this.layoutElements[index],
                        ...position,
                    },
                });
            } else if (this.draggedElement === this.sectionType) {
                this.sectionPosition = position;
                this.isSectionAdded = true;
            } else {
                this.addListElementToLayout({
                    position,
                    draggableId,
                });
            }

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'templateDesigner',
                value: true,
            });
        },
        onEditSectionTitle(index) {
            this.sectionElement = this.layoutElements[index];
            this.sectionIndex = index;
            this.isSectionAdded = true;
        },
        onCloseSectionModal() {
            this.sectionPosition = null;
            this.sectionElement = null;
            this.isSectionAdded = false;
            this.sectionIndex = null;
        },
        onRemoveLayoutElement(index) {
            this.removeLayoutElementAtIndex(index);

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'templateDesigner',
                value: true,
            });
        },
        getBackgroundItem({
            pageX,
            pageY,
        }) {
            const elements = document.elementsFromPoint(pageX, pageY);
            const backgroundItem = elements.find(element => element.classList.contains('template-designer-background-item--highlighted'));

            if (backgroundItem) {
                return {
                    element: backgroundItem,
                    row: +backgroundItem.getAttribute('row'),
                    column: +backgroundItem.getAttribute('column'),
                };
            }

            return null;
        },
        isOutOfBounds(event) {
            const {
                xPos,
                yPos,
            } = getPositionForBrowser(event);

            return isMouseOutOfBoundsElement(this.$refs.designerDraggableLayer.$el, xPos, yPos);
        },
    },
};
</script>
