/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <FadeTransition>
                    <DropZone
                        v-show="isDropZoneVisible"
                        :hover-background-color="graphiteLightColor"
                        title="REMOVE ELEMENT">
                        <template #icon="{ color }">
                            <IconRemoveFilter :fill-color="color" />
                        </template>
                    </DropZone>
                </FadeTransition>
            </VerticalTabBar>
        </template>
        <template #grid>
            <TemplateGridDesigner
                :max-row="maxLayoutRow"
                @rowsCount="onRowsCountChange">
                <TemplateGridDraggableLayer
                    :style="gridStyles"
                    :rows-number="maxLayoutRow"
                    :columns-number="columnsNumber"
                    :highlighted-positions="highlightedPositions"
                    @drop="updateLayoutElement">
                    <template #elements>
                        <TemplateGridPlaceholderItem v-if="!layoutElements.length" />
                        <LayoutElement
                            v-for="(element, index) in layoutElements"
                            :key="`${element.row}/${element.column}`"
                            :style="getLayoutElementPosition(element)"
                            :index="index"
                            :element="element"
                            :columns-number="columnsNumber"
                            :rows-number="maxLayoutRow"
                            :disabled="!isUserAllowedToUpdate"
                            @highlightedPositionChange="onHighlightedPositionsChange"
                            @resizingElMaxRow="onResizingElMaxRow"
                            @remove="onRemoveLayoutElement">
                            <template #content>
                                <AttributeElementContent
                                    v-if="element.type !== sectionType"
                                    :element="element"
                                    :disabled="!isUserAllowedToUpdate"
                                    :index="index" />
                                <SectionElementContent
                                    v-else
                                    :element="element"
                                    :index="index"
                                    :disabled="!isUserAllowedToUpdate"
                                    @editTitle="onEditSectionTitle" />
                            </template>
                        </LayoutElement>
                    </template>
                </TemplateGridDraggableLayer>
                <SectionTemplateModalForm
                    v-if="isSectionAdded"
                    :section-position="sectionPosition"
                    :section-title="sectionTitle"
                    :section-index="sectionIndex"
                    @close="onCloseSectionModal" />
            </TemplateGridDesigner>
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import {
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
import DropZone from '@Core/components/DropZone/DropZone';
import IconRemoveFilter from '@Core/components/Icons/Actions/IconRemoveFilter';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    getObjectWithMaxValueInArrayByObjectKey,
} from '@Core/models/arrayWrapper';
import {
    isObject,
} from '@Core/models/objectWrapper';
import TemplateGridDesigner from '@Templates/components/Template/Base/TemplateGridDesigner';
import TemplateGridDraggableLayer from '@Templates/components/Template/Base/TemplateGridDraggableLayer';
import TemplateGridPlaceholderItem from '@Templates/components/Template/Base/TemplateGridPlaceholderItem';
import LayoutElement from '@Templates/components/Template/ProductDesigner/LayoutElement';
import {
    getHighlightingLayoutDropPositions,
} from '@Templates/models/layout/LayoutCalculations';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateDesignerTab',
    components: {
        DropZone,
        FadeTransition,
        GridViewTemplate,
        TemplateGridDesigner,
        TemplateGridDraggableLayer,
        TemplateGridPlaceholderItem,
        LayoutElement,
        IconRemoveFilter,
        VerticalTabBar: () => import('@Core/components/TabBar/VerticalTabBar'),
        SectionTemplateModalForm: () => import('@Templates/components/Modals/SectionTemplateModalForm'),
        AttributeElementContent: () => import('@Templates/components/Template/ProductDesigner/AttributeElementContent'),
        SectionElementContent: () => import('@Templates/components/Template/ProductDesigner/SectionElementContent'),
    },
    data() {
        return {
            highlightedPositions: [],
            isSectionAdded: false,
            sectionPosition: null,
            sectionIndex: null,
            sectionTitle: '',
            columnsNumber: 4,
            maxRow: 0,
        };
    },
    computed: {
        ...mapState('templateDesigner', {
            templateGroups: state => state.templateGroups,
            layoutElements: state => state.layoutElements,
            titleValidationError: state => state.titleValidationError,
            title: state => state.title,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
            isElementDragging: state => state.isElementDragging,
        }),
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        verticalTabs() {
            return [
                {
                    title: 'Product attributes',
                    component: () => import('@Attributes/components/Tabs/List/AttributesListTab'),
                    props: {
                        isSelectLanguage: false,
                        disabled: !this.$hasAccess([
                            'TEMPLATE_DESIGNER_UPDATE',
                        ]),
                    },
                    iconComponent: () => import('@Core/components/Icons/Menu/IconAttributes'),
                },
                {
                    title: 'Widgets',
                    component: () => import('@Templates/components/Tabs/List/WidgetsListTab'),
                    iconComponent: () => import('@Core/components/Icons/Widgets/IconWidget'),
                },
            ];
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                'TEMPLATE_DESIGNER_UPDATE',
            ]);
        },
        errorMessages() {
            return this.titleValidationError ? [
                this.titleValidationError,
            ] : null;
        },
        sectionType() {
            return SYSTEM_TYPES.SECTION;
        },
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columnsNumber}, 1fr)`,
                gridTemplateRows: `repeat(${this.maxRow}, 62px)`,
            };
        },
        maxLayoutRow() {
            const layoutElement = getObjectWithMaxValueInArrayByObjectKey(this.layoutElements, 'row');

            if (layoutElement) {
                const {
                    row, height,
                } = layoutElement;

                return Math.max(this.maxRow, row + height);
            }

            return this.maxRow;
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
                    layoutWidth: this.columnsNumber,
                    layoutHeight: this.maxLayoutRow,
                    layoutElements: this.layoutElements,
                });
            } else {
                this.highlightedPositions = [];
            }

            return true;
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'addListElementToLayout',
            'updateLayoutElementPosition',
            'removeLayoutElementAtIndex',
        ]),
        onRemoveLayoutElement(index) {
            this.removeLayoutElementAtIndex(index);
        },
        onResizingElMaxRow(row) {
            if (row > this.maxRow) {
                this.maxRow = row;
            }
        },
        onRowsCountChange({
            value,
        }) {
            this.maxRow = value;
        },
        onHighlightedPositionsChange(positions) {
            this.highlightedPositions = positions;
        },
        updateLayoutElement(position) {
            this.highlightedPositions = [];

            if (isObject(this.draggedElement)) {
                const {
                    row, column,
                } = position;
                const index = this.layoutElements.findIndex(
                    el => el.id === this.draggedElement.id,
                );

                this.updateLayoutElementPosition({
                    index,
                    row,
                    column,
                });
            } else if (this.draggedElement === this.sectionType) {
                this.sectionPosition = position;
                this.isSectionAdded = true;
            } else {
                this.addListElementToLayout(position);
            }
        },
        onEditSectionTitle(index) {
            const {
                [index]: layoutElement,
            } = this.layoutElements;
            this.sectionTitle = layoutElement.label;
            this.sectionIndex = index;
            this.isSectionAdded = true;
        },
        onCloseSectionModal() {
            this.sectionPosition = null;
            this.isSectionAdded = false;
            this.sectionTitle = '';
            this.sectionIndex = null;
        },
        getLayoutElementPosition({
            row, column, width, height,
        }) {
            return {
                gridArea: `${row} / ${column} / ${row + height} / ${column + width}`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid {
        overflow: auto;
        border-left: $BORDER_1_GREY;
    }
</style>
