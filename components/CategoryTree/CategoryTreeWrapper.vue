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
            @toggleItem="(item) => toggleItem(item)">
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
                    :columns="columns"
                    :rows-height="rowsHeight">
                    <TemplateGridGhostItem
                        v-if="item.ghost" />
                    <CategoryTreeItem
                        v-else
                        :number-of-children="getChildrenLengthById(item.id)"
                        :is-expanded="getExpandStateById(item.id)"
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
            'setHiddenItem',
            'removeHiddenItem',
            'setExpandItem',
        ]),
        toggleItem({
            id, row, column, expanded,
        }) {
            const rowValue = Math.floor(row);
            if (!expanded) {
                const maxChildRow = getMaxChildRow(this.treeData, column, rowValue);
                const {
                    hiddenCategories,
                    visibleCategories,
                } = this.treeData.reduce((acc, e, idx) => {
                    if (idx > rowValue && idx < maxChildRow) {
                        acc.hiddenCategories.push(e);
                    } else {
                        acc.visibleCategories.push(e);
                    }
                    return acc;
                }, { hiddenCategories: [], visibleCategories: [] });
                this.setHiddenItem({ key: id, value: hiddenCategories });
                this.setTreeWhenCollapse({ tree: visibleCategories, index: rowValue });
                this.setExpandItem({ index: rowValue, value: true });
            } else {
                this.setTreeWhenExpand({ id, index: rowValue });
                this.removeHiddenItem(id);
                this.setExpandItem({ index: rowValue, value: false });
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
