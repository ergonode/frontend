/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Designer
        :columns="columns"
        :last-item-row="lastItemRow">
        <template #backgroundItem="{ row, column }">
            <TemplateDesignerBackgroundItem
                :key="`${column} | ${row}`"
                :highlighting-positions="highlightedPositions"
                :column="column"
                :row="row" />
        </template>
        <template #prependBody="{ rows, layerStyle }">
            <DesignerDraggableLayer :style="layerStyle">
                <DesignerPlaceholderItem
                    v-if="!layoutElements.length"
                    :width="1" />

                <LayoutElement
                    v-for="(element, index) in layoutElements"
                    :key="`${element.row}/${element.column}`"
                    :index="index"
                    :element="element"
                    :columns-number="columns"
                    :rows-number="rows"
                    :disabled="!isAllowedToUpdate"
                    @highlighted-position-change="onHighlightedPositionsChange"
                    @resizing-el-max-row="onResizingElMaxRow"
                    @remove="onRemoveLayoutElement">
                    <template #content>
                        <AttributeElementContent
                            v-if="element.type !== sectionType"
                            :scope="scope"
                            :errors="errors"
                            :change-values="changeValues"
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
        </template>
        <!--                <TreeDesignerDraggableLayer-->
        <!--                    :style="gridStyles"-->
        <!--                    :rows-number="lastItemRow"-->
        <!--                    :columns-number="columns"-->
        <!--                    :highlighted-positions="highlightedPositions"-->
        <!--                    @drop="updateLayoutElement">-->
        <!--                    <template #elements>-->
        <!--                    </template>-->
        <!--                </TreeDesignerDraggableLayer>-->
        <!--                <SectionTemplateModalForm-->
        <!--                    v-if="isSectionAdded"-->
        <!--                    :index="sectionIndex"-->
        <!--                    :scope="scope"-->
        <!--                    :errors="errors"-->
        <!--                    :change-values="changeValues"-->
        <!--                    :position="sectionPosition"-->
        <!--                    :element="sectionElement"-->
        <!--                    @close="onCloseSectionModal" />-->
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
    },
    data() {
        return {
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
                    layoutHeight: this.lastItemRow,
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
        ...mapActions('productTemplate', [
            'addListElementToLayout',
            'updateLayoutElementAtIndex',
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onResizingElMaxRow(row) {
            if (row > this.maxRow) {
                this.maxRow = row;
            }

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'templateDesigner',
                value: true,
            });
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
    },
};
</script>
