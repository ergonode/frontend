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
            :grid-data="filteredGridData"
            :is-dragging-enabled="isDraggingEnabled"
            :is-multi-draggable="isMultiDraggable"
            :dragged-element-size="draggedElementSize"
            @removeDisabledElementsOnList="removeDisabledElementsOnList"
            @toggleItem="toggleItem"
            @afterDrop="id => $emit('afterDrop', id)"
            @afterRemove="id => $emit('afterRemove', id)">
            <TemplateGridPresentationLayer
                :style="gridStyles"
                :columns="columns"
                :rows="rows" />
            <TemplateGridItemsContainer
                :style="gridStyles">
                <TemplateGridItemArea
                    v-for="item in filteredGridData"
                    :key="item.id"
                    :item="item"
                    :columns="columns"
                    :grid-gap="gridGap">
                    <TemplateGridGhostItem
                        v-if="item.id === 'ghost_item'" />
                    <slot
                        v-else
                        name="gridItem"
                        :item="item"
                        :toggle-item="toggleItem"
                        :remove-item="removeItem" />
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
import { mapState, mapActions } from 'vuex';
import { getNearestNeighborRowId } from '~/model/tree/TreeCalculations';
import TemplateGridPresentationLayer from '~/components/TemplateGrid/TemplateGridPresentationLayer';
import TemplateGridItemsContainer from '~/components/TemplateGrid/TemplateGridItemsContainer';
import TemplateGridContainer from '~/components/TemplateGrid/TemplateGridContainer';
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateGridGhostItem';
import TemplateGridItemArea from '~/components/TemplateGrid/TemplateGridItemArea';

export default {
    name: 'TemplateGridWrapper',
    components: {
        TemplateGridPresentationLayer,
        TemplateGridItemsContainer,
        TemplateGridContainer,
        TemplateGridGhostItem,
        TemplateGridItemArea,
    },
    props: {
        isDraggingEnabled: {
            type: Boolean,
            default: false,
        },
        isMultiDraggable: {
            type: Boolean,
            default: false,
        },
        gridGap: {
            type: Number,
            default: 10,
        },
        isConnectionsVisible: {
            type: Boolean,
            default: true,
        },
        columns: {
            type: Number,
            required: true,
        },
        rowHeight: {
            type: Number,
            required: true,
        },
        draggedElementSize: {
            type: Object,
            default: () => ({
                width: 247,
                height: 40,
            }),
        },
    },
    computed: {
        ...mapState('authentication', {
            language: (state) => state.user.language,
        }),
        ...mapState('gridDesigner', {
            rows: (state) => state.rows,
            gridData: (state) => state.gridData,
            hiddenItems: (state) => state.hiddenItems,
        }),
        filteredGridData() {
            return this.gridData.filter(
                (item) => item.column < this.columns,
            );
        },
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowHeight}px`,
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
                }, { hiddenCategories: [], visibleCategories: [] });

                this.setHiddenItem({ key: id, value: hiddenCategories });
                this.setGridWhenCollapse({ data: visibleCategories, index: rowValue });
                this.setExpandItem({ index: rowValue, value: true });
            } else {
                this.setGridWhenExpand({ id, index: rowValue });
                this.removeHiddenItem(id);
                this.setExpandItem({ index: rowValue, value: false });
            }
        },
        connectionLineStyle({ id, row, parent }) {
            const children = this.filteredGridData.filter((e) => e.parent === parent);
            const connectionHeight = this.rowHeight * (
                row - (children.length ? children[0].row : 0) + 1
            );
            const borderStyle = id === 'ghost_item' ? 'dashed' : 'solid';
            const linePosition = {
                left: `-${100 - this.gridGap}%`,
                width: `${100 - this.gridGap}%`,
            };

            if (parent === 'root') {
                linePosition.left = `-${this.gridGap}px`;
                linePosition.width = `${this.gridGap}px`;
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
        removeItem(item) {
            const { id, parent } = item;
            this.toggleItem(item);
            this.removeDisabledElementsOnList(id);
            this.removeHiddenItem(id);
            if (parent !== 'root') {
                this.setChildrenLength({ id: parent, value: -1 });
            }
            this.removeGridItem(id);
        },
        removeDisabledElementsOnList(id) {
            if (this.hiddenItems[id]) {
                const childrenForHiddenItem = this.hiddenItems[id];

                for (let i = 0; i < childrenForHiddenItem.length; i += 1) {
                    this.removeDisabledElement({
                        languageCode: this.language,
                        elementId: childrenForHiddenItem[i].id,
                    });
                }
            }
            this.removeDisabledElement({
                languageCode: this.language,
                elementId: id,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid-wrapper {
        z-index: 20;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: space-between;
        height: 0;
        padding: 0 12px;
    }

    .bounce-enter-active, .bounce-leave-active {
        transform-origin: top left;
    }

    .bounce-enter-active {
        animation: bounce-in 0.4s;
    }

    .bounce-leave-active {
        animation: bounce-in 0.4s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(1, 0);
        }

        100% {
            transform: scale(1);
        }
    }
</style>
