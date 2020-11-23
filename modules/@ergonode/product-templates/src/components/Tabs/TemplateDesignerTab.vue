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
                @rows-count="onRowsCountChange">
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
                    </template>
                </TemplateGridDraggableLayer>
                <SectionTemplateModalForm
                    v-if="isSectionAdded"
                    :index="sectionIndex"
                    :scope="scope"
                    :errors="errors"
                    :change-values="changeValues"
                    :position="sectionPosition"
                    :element="sectionElement"
                    @close="onCloseSectionModal" />
            </TemplateGridDesigner>
            <Button
                title="SAVE CHANGES"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSubmit">
                <template
                    v-if="isSubmitting"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getObjectWithMaxValueInArrayByObjectKey,
} from '@Core/models/arrayWrapper';
import {
    isObject,
} from '@Core/models/objectWrapper';
import TemplateGridDesigner from '@Templates/components/Template/Base/TemplateGridDesigner';
import TemplateGridDraggableLayer from '@Templates/components/Template/Base/TemplateGridDraggableLayer';
import TemplateGridPlaceholderItem from '@Templates/components/Template/Base/TemplateGridPlaceholderItem';
import AttributeElementContent from '@Templates/components/Template/ProductDesigner/AttributeElementContent';
import LayoutElement from '@Templates/components/Template/ProductDesigner/LayoutElement';
import SectionElementContent from '@Templates/components/Template/ProductDesigner/SectionElementContent';
import PRIVILEGES from '@Templates/config/privileges';
import {
    getHighlightingLayoutDropPositions,
} from '@Templates/models/layout/LayoutCalculations';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import DropZone from '@UI/components/DropZone/DropZone';
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateDesignerTab',
    components: {
        Button,
        IconSpinner,
        DropZone,
        FadeTransition,
        GridViewTemplate,
        TemplateGridDesigner,
        TemplateGridDraggableLayer,
        TemplateGridPlaceholderItem,
        LayoutElement,
        IconRemoveFilter,
        VerticalTabBar,
        AttributeElementContent,
        SectionElementContent,
        SectionTemplateModalForm: () => import('@Templates/components/Modals/SectionTemplateModalForm'),
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            highlightedPositions: [],
            isSubmitting: false,
            isSectionAdded: false,
            sectionPosition: null,
            sectionIndex: null,
            sectionElement: null,
            columnsNumber: 4,
            maxRow: 0,
        };
    },
    computed: {
        ...mapState('productTemplate', [
            'templateGroups',
            'layoutElements',
            'title',
        ]),
        ...mapState('draggable', [
            'draggedElement',
            'isElementDragging',
        ]),
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
                            PRIVILEGES.TEMPLATE_DESIGNER.update,
                        ]),
                    },
                    icon: () => import('@Attributes/components/Icons/IconAttributes'),
                },
                {
                    title: 'Widgets',
                    component: () => import('@Templates/components/Tabs/List/WidgetsListTab'),
                    icon: () => import('@Core/components/Icons/Widgets/IconWidget'),
                },
            ];
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
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
        ...mapActions('productTemplate', [
            'updateTemplate',
            'addListElementToLayout',
            'updateLayoutElementAtIndex',
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors();
            this.updateTemplate({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Template has been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
        onRemoveLayoutElement(index) {
            this.removeLayoutElementAtIndex(index);

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'templateDesigner',
                value: true,
            });
        },
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
        onRowsCountChange({
            value,
        }) {
            this.maxRow = value;
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
    }
</style>
