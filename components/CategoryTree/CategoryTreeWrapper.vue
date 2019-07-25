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
            @setRowsCount="setRowsCount"
            @toggleItem="(i) => toggleItem(i)">
            <TemplateGridPresentationLayer
                :style="gridStyles"
                :columns="columns"
                :rows="rowsCount" />
            <TemplateGridItemsContainer
                :style="gridStyles">
                <TemplateGridItemArea
                    v-for="item in filteredTreeData"
                    :key="item.id"
                    :item="item"
                    :columns="columns">
                    <TemplateGridGhostItem
                        v-if="item.ghost" />
                    <CategoryTreeItem
                        v-else
                        :number-of-children="getChildrenLengthById(item.id)"
                        :is-expand="getExpandStateById(item.id)"
                        :item-name="item.name || item.code"
                        @toggleItem="toggleItem(item)" />
                </TemplateGridItemArea>
            </TemplateGridItemsContainer>
        </TemplateGridContainer>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import {
    getMinChildRow,
    getMaxChildRow,
} from '~/model/tree/TreeCalculations';
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
        }),
        ...mapGetters('tree', [
            'getChildrenByParentId',
            'getChildrenLengthById',
            'getExpandStateById',
        ]),
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
            'setExpandItem',
        ]),
        toggleItem({
            id, row, column, expand,
        }) {
            const minChildRow = getMinChildRow(this.getChildrenByParentId(id));
            const maxChildRow = getMaxChildRow(this.treeData, column, row);
            const treeCategories = this.treeData.reduce((acc, e) => {
                if (e.row >= minChildRow && e.row < maxChildRow) {
                    acc.hidden.push(e);
                } else {
                    acc.visible.push(e);
                }
                return acc;
            }, { hidden: [], visible: [] });
            if (!expand) {
                this.setHiddenItem({ key: id, value: treeCategories.hidden });
                this.setTreeWhenCollapse({ tree: treeCategories.visible, id });
                this.setExpandItem({ id, value: true });
            } else {
                this.setTreeWhenExpand(id);
                this.removeHiddenItem(id);
                this.setExpandItem({ id, value: false });
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
