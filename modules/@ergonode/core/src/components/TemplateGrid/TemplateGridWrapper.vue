/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-grid-wrapper">
        <slot name="gridHeader" />
        <TemplateGridContainer
            :columns="columns"
            :rows="rows"
            :row-height="rowHeight"
            :constant-root="constantRoot"
            :grid-data="filteredGridData"
            :is-dragging-enabled="isDraggingEnabled"
            :is-multi-draggable="isMultiDraggable"
            @toggle-item="toggleItem"
            @after-drop="id => $emit('after-drop', id)"
            @after-remove="id => $emit('after-remove', id)"
            @remove="removeItemOnDrop">
            <slot
                name="gridPresentationLayer"
                :rows="rows">
                <TemplateGridPresentationLayer
                    :style="gridStyles"
                    :columns="columns"
                    :rows="rows" />
            </slot>
            <TemplateGridItemsContainer
                :style="gridStyles">
                <TemplateGridItemArea
                    v-for="(item, index) in filteredGridData"
                    :key="item.id"
                    :item="item"
                    :columns="columns"
                    :grid-gap="gridGap">
                    <slot
                        name="gridGhostItem"
                        v-if="item.id === 'ghost_item'"
                        :grid-item-styles="gridItemStyles">
                        <TemplateGridGhostItem
                            :style="gridItemStyles"
                            :context-name="contextName" />
                    </slot>
                    <slot
                        v-else
                        name="gridItem"
                        :item="item"
                        :index="index"
                        :grid-item-styles="gridItemStyles"
                        :toggle-item="toggleItem"
                        :remove-item="removeItem">
                        <TemplateGridItem
                            :style="gridItemStyles"
                            :number-of-children="getChildrenLength(item.id)"
                            :is-expanded="getExpandState(item.id)"
                            :is-dragging-enabled="isDraggingEnabled"
                            :item="item"
                            :context-name="contextName"
                            @toggle-item="toggleItem(item)"
                            @remove-item="removeItem(item)" />
                    </slot>
                    <template
                        v-if="isConnectionsVisible"
                        #connection>
                        <div
                            class="item-area__line"
                            :style="connectionLineStyle(item)" />
                    </template>
                </TemplateGridItemArea>
            </TemplateGridItemsContainer>
        </TemplateGridContainer>
    </div>
</template>

<script>
import TemplateGridContainer from '@Core/components/TemplateGrid/TemplateGridContainer';
import TemplateGridGhostItem from '@Core/components/TemplateGrid/TemplateGridGhostItem';
import TemplateGridItem from '@Core/components/TemplateGrid/TemplateGridItem';
import TemplateGridItemArea from '@Core/components/TemplateGrid/TemplateGridItemArea';
import TemplateGridItemsContainer from '@Core/components/TemplateGrid/TemplateGridItemsContainer';
import TemplateGridPresentationLayer from '@Core/components/TemplateGrid/TemplateGridPresentationLayer';
import {
    getNearestNeighborRowId,
} from '@Core/models/template_grid/TreeCalculations';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateGridWrapper',
    components: {
        TemplateGridPresentationLayer,
        TemplateGridItemsContainer,
        TemplateGridContainer,
        TemplateGridGhostItem,
        TemplateGridItemArea,
        TemplateGridItem,
    },
    props: {
        /**
         * Scope of context
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines state of draggable attribute
         */
        isDraggingEnabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component might be dragged twice
         */
        isMultiDraggable: {
            type: Boolean,
            default: false,
        },
        /**
         * Space between each item
         */
        gridGap: {
            type: Number,
            default: 8,
        },
        isConnectionsVisible: {
            type: Boolean,
            default: true,
        },
        constantRoot: {
            type: Boolean,
            default: false,
        },
        contextName: {
            type: String,
            default: '',
        },
        /**
         * Number of visible columns
         */
        columns: {
            type: Number,
            required: true,
        },
        /**
         * Determines the size of row height
         */
        rowHeight: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('list', [
            'disabledElements',
        ]),
        ...mapState('gridDesigner', [
            'rows',
            'gridData',
            'hiddenItems',
        ]),
        ...mapGetters('gridDesigner', [
            'getChildrenLength',
            'getExpandState',
        ]),
        filteredGridData() {
            return this.gridData.filter(
                item => item.column < this.columns,
            );
        },
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowHeight}px`,
            };
        },
        gridItemStyles() {
            return {
                margin: `0 ${this.gridGap}px`,
            };
        },
    },
    methods: {
        ...mapActions('gridDesigner', [
            'setGridWhenCollapse',
            'setGridWhenExpand',
            'setChildrenLength',
            'setHiddenItem',
            'removeHiddenItem',
            'setExpandItem',
            'removeGridItem',
        ]),
        ...mapActions('list', [
            'removeDisabledElement',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        toggleItem({
            id, row, column, expanded,
        }) {
            const rowValue = Math.floor(row);

            if (!expanded) {
                const maxChildRow = getNearestNeighborRowId(
                    this.filteredGridData,
                    column,
                    rowValue,
                );
                const {
                    hiddenCategories,
                    visibleCategories,
                } = this.filteredGridData.reduce((acc, e, idx) => {
                    if (idx > rowValue && idx < maxChildRow) {
                        acc.hiddenCategories.push(e);
                    } else {
                        acc.visibleCategories.push(e);
                    }
                    return acc;
                }, {
                    hiddenCategories: [],
                    visibleCategories: [],
                });

                this.setHiddenItem({
                    key: id,
                    value: hiddenCategories,
                });
                this.setGridWhenCollapse({
                    data: visibleCategories,
                    index: rowValue,
                });
                this.setExpandItem({
                    index: rowValue,
                    value: true,
                });
            } else {
                this.setGridWhenExpand({
                    id,
                    index: rowValue,
                });
                this.removeHiddenItem(id);
                this.setExpandItem({
                    index: rowValue,
                    value: false,
                });
            }

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'designer',
                value: true,
            });
        },
        connectionLineStyle({
            id, row, parent,
        }) {
            if (this.constantRoot && row === 0) {
                return {
                    display: 'none',
                };
            }
            const children = this.filteredGridData.filter(e => e.parent === parent);
            const connectionHeight = this.rowHeight * (
                row - (children.length ? children[0].row : 0) + 1
            ) + 10;
            const borderStyle = id === 'ghost_item' ? 'dashed' : 'solid';
            const linePosition = {
                left: `calc(-100% + (${this.gridGap}px + 22px))`,
            };

            if (parent === 'root') {
                linePosition.left = '0';
            }

            return {
                borderBottomStyle: borderStyle,
                borderLeftStyle: borderStyle,
                left: linePosition.left,
                width: linePosition.width,
                height: `${connectionHeight}px`,
                bottom: `${this.rowHeight / 2}px`,
            };
        },
        removeItemOnDrop(item) {
            this.removeDisabledElementsOnList(item.id);

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'designer',
                value: true,
            });
        },
        removeItem(item) {
            const {
                id, row, parent,
            } = item;

            this.toggleItem(item);
            this.removeDisabledElementsOnList(id);
            this.removeHiddenItem(id);
            this.setChildrenLength({
                id: parent,
                value: -1,
            });
            this.removeGridItem(row);

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'designer',
                value: true,
            });
        },
        removeDisabledElementsOnList(id) {
            if (this.hiddenItems[id]) {
                const childrenForHiddenItem = this.hiddenItems[id];

                for (let i = 0; i < childrenForHiddenItem.length; i += 1) {
                    if (typeof this.disabledElements[this.language] !== 'undefined'
                        && typeof this.disabledElements[this.language][childrenForHiddenItem[i].id] !== 'undefined') {
                        this.removeDisabledElement({
                            languageCode: this.language,
                            elementId: childrenForHiddenItem[i].id,
                        });
                    }
                }
            }

            if (typeof this.disabledElements[this.language] !== 'undefined'
                && typeof this.disabledElements[this.language][id] !== 'undefined') {
                this.removeDisabledElement({
                    languageCode: this.language,
                    elementId: id,
                });
            }

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'designer',
                value: true,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid-wrapper {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: space-between;
        height: 0;
        padding: 24px 24px 0;
        overflow: auto;
    }
</style>
