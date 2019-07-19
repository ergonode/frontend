/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="category-tree-wrapper">
        <TemplateGridHeader
            :style="gridStyles"
            :columns="columns" />
        <TemplateGridContainer
            :columns="columns"
            :rows="rowsCount"
            :rows-height="rowsHeight"
            :tree-data="filteredTreeData"
            @addItem="addTreeItem"
            @removeItem="removeTreeItem"
            @rebuildGrid="rebuildTree"
            @setRowsCount="setRowsCount">
            <TemplateGridPresentationLayer
                :style="gridStyles"
                :columns="columns"
                :rows="rowsCount" />
            <TemplateGridItemsContainer
                :style="gridStyles"
                @removeItem="removeTreeItem">
                <TemplateGridItemArea
                    v-for="item in filteredTreeData"
                    :key="item.id"
                    :item="item"
                    :columns="columns">
                    <TemplateGridGhostItem
                        v-if="item.ghost" />
                    <CategoryTreeItem
                        v-else
                        :number-of-children="getChildren(item.id).length"
                        :item-name="item.name || item.code"
                        @expandItem="e => expandItem(e, item)" />
                </TemplateGridItemArea>
            </TemplateGridItemsContainer>
        </TemplateGridContainer>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TemplateGridPresentationLayer from '~/components/TemplateGrid/TemplateGridPresentationLayer';
import TemplateGridItemsContainer from '~/components/TemplateGrid/TemplateGridItemsContainer';
import TemplateGridContainer from '~/components/TemplateGrid/TemplateGridContainer';
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateGridGhostItem';
import TemplateGridItemArea from '~/components/TemplateGrid/TemplateGridItemArea';
import TemplateGridHeader from '~/components/TemplateGrid/TemplateGridHeader';
import CategoryTreeItem from '~/components/CategoryTree/CategoryTreeItem';

export default {
    name: 'CategoryTreeWrapper',
    components: {
        TemplateGridPresentationLayer,
        TemplateGridItemsContainer,
        TemplateGridContainer,
        TemplateGridGhostItem,
        TemplateGridItemArea,
        TemplateGridHeader,
        CategoryTreeItem,
    },
    computed: {
        ...mapState('tree', {
            columns: state => state.treeLevels,
            rowsHeight: state => state.rowsHeight,
            rowsCount: state => state.rowsCount,
            treeData: state => state.treeData,
            hiddenItems: state => state.hiddenItems,
        }),
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        filteredTreeData() {
            return this.treeData.filter(
                item => item.column < this.columns,
            );
        },
    },
    methods: {
        ...mapActions('tree', [
            'setTreeWhenCollapse',
            'setTreeWhenExpand',
            'setRowsCount',
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
            return hiddenItems.some(e => e.id === id);
        },
        getChildren(parentId) {
            const visibleChildren = this.treeData.filter(({ parent }) => parent === parentId);
            const hiddenChildren = this.hiddenItems[parentId] || [];
            return visibleChildren.length > 0 ? visibleChildren : hiddenChildren;
        },
        expandItem(isExpanded, { id, row, column }) {
            const children = this.getChildren(id);
            const childrenRows = children.map(e => e.row);
            const [neighbor] = this.treeData.filter(
                e => e.column <= column && e.row > row,
            );
            const minChildRow = Math.min(...childrenRows);
            const maxChildRow = neighbor ? neighbor.row : this.treeData.length;
            const treeCategories = this.treeData.reduce((acc, e) => {
                if (e.row >= minChildRow && e.row <= maxChildRow - 1) {
                    acc.hidden.push(e);
                } else {
                    acc.visible.push(e);
                }
                return acc;
            }, { hidden: [], visible: [] });
            if (!isExpanded) {
                this.setHiddenItem({ key: id, value: treeCategories.hidden });
                // TODO: uncomment when algorithm to removing category from tree will be over
                // this.setTreeWhenCollapse({ tree: treeCategories.visible, id });
            } else {
                // this.setTreeWhenExpand(id);
                this.removeHiddenItem(id);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-tree-wrapper {
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
