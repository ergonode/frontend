/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="category-tree-wrapper">
        <TemplateGridHeader
            :grid-styles="gridStyles"
            :columns="columns" />
        <TemplateGridScroll
            :data-row-length="filteredGridData.length"
            :rows-height="rowsHeight"
            @setRowsCount="setAction">
            <TemplateGridContainer
                :columns="columns"
                :rows="rowsCount"
                :rows-height="rowsHeight"
                :grid-data="filteredGridData"
                :dragged-element="draggedElement"
                :hidden-items="hiddenItems"
                @addItem="addTreeItem"
                @removeItem="removeTreeItem"
                @rebuildGrid="rebuildTree"
                @setRowsCount="setAction">
                <TemplateGridPresentationLayer
                    :grid-styles="gridStyles"
                    :columns="columns"
                    :rows="rowsCount" />
                <TemplateGridItemsContainer
                    :grid-styles="gridStyles">
                    <TemplateGridItemArea
                        v-for="item in filteredGridData"
                        v-show="!isHidden(item.id)"
                        :key="item.id"
                        :item="item"
                        :columns="columns">
                        <TemplateGridGhostItem
                            v-if="item.ghost" />
                        <CategoryTreeItem
                            v-else
                            :number-of-children="getChildren(item.id).length"
                            :item-name="item.id"
                            @expandItem="e => expandItem(e, item)" />
                    </TemplateGridItemArea>
                </TemplateGridItemsContainer>
            </TemplateGridContainer>
        </TemplateGridScroll>
        <GridFooter :is-pagination-visible="false" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TemplateGridPresentationLayer from '~/components/TemplateGrid/TemplateGridPresentationLayer';
import TemplateGridItemsContainer from '~/components/TemplateGrid/TemplateGridItemsContainer';
import TemplateGridContainer from '~/components/TemplateGrid/TemplateGridContainer';
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateGridGhostItem';
import TemplateGridItemArea from '~/components/TemplateGrid/TemplateGridItemArea';
import TemplateGridScroll from '~/components/TemplateGrid/TemplateGridScroll';
import TemplateGridHeader from '~/components/TemplateGrid/TemplateGridHeader';
import CategoryTreeItem from '~/components/CategoryTree/CategoryTreeItem';
import GridFooter from '~/components/Grid/GridFooter';

export default {
    name: 'CategoryTreeWrapper',
    components: {
        TemplateGridPresentationLayer,
        TemplateGridItemsContainer,
        TemplateGridContainer,
        TemplateGridGhostItem,
        TemplateGridItemArea,
        TemplateGridScroll,
        TemplateGridHeader,
        CategoryTreeItem,
        GridFooter,
    },
    computed: {
        ...mapState('tree', {
            columns: state => state.treeLevels,
            rowsHeight: state => state.rowsHeight,
            rowsCount: state => state.rowsCount,
            gridData: state => state.treeData,
            hiddenItems: state => state.hiddenItems,
        }),
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
        }),
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        filteredGridData() {
            return this.gridData.filter(item => item.column < this.columns);
        },
    },
    methods: {
        ...mapActions('tree', [
            'setAction',
            'addTreeItem',
            'removeTreeItem',
            'rebuildTree',
            'setHiddenItem',
            'removeHiddenItem',
        ]),
        isHidden(id) {
            const hiddenItems = Object.keys(this.hiddenItems).reduce((acc, el) => {
                acc.push(...this.hiddenItems[el]);
                return acc;
            }, []);
            return hiddenItems.some(e => e === id);
        },
        getChildren(itemId) {
            return this.gridData.filter(item => item.parent === itemId);
        },
        expandItem(isExpanded, item) {
            const children = this.getChildren(item.id);
            const childrenRows = children.map(e => e.row);
            const [neighbor] = this.gridData.filter(
                e => e.column <= item.column && e.row > item.row,
            );
            const minChildRow = Math.min(...childrenRows);
            const maxChildRow = neighbor ? neighbor.row : this.gridData.length;
            const childrenToHide = this.gridData.filter(
                e => e.row >= minChildRow && e.row <= maxChildRow - 1,
            );
            if (!isExpanded) {
                this.setHiddenItem({ key: item.id, value: childrenToHide.map(e => e.id) });
            } else {
                this.removeHiddenItem(item.id);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-tree-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
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
