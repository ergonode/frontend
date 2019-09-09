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
            :rows-height="rowsHeight"
            :grid-data="filteredGridData"
            @toggleItem="(item) => toggleItem(item)"
            @methodAfterDrop="(data) => methodAfterDrop(data)">
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
                    :rows-height="rowsHeight"
                    :grid-gap="gridGap">
                    <TemplateGridGhostItem
                        v-if="item.ghost" />
                    <slot
                        v-else
                        name="gridItem"
                        :item="item"
                        :toggle-item-method="toggleItem"
                        :get-children-length-method="getChildrenLengthById"
                        :get-expand-state-method="getExpandStateById"
                    />
                    <template
                        v-if="isConnectionsVisible"
                        slot="connection">
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
import { mapState, mapActions, mapGetters } from 'vuex';
import { getMaxChildRow } from '~/model/tree/TreeCalculations';
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
        gridStyles: {
            type: Object,
            required: true,
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
        rowsHeight: {
            type: Number,
            required: true,
        },
        methodAfterDrop: {
            type: Function,
            default: () => {},
        },
    },
    computed: {
        ...mapState('gridDesigner', {
            rows: state => state.rows,
            gridData: state => state.gridData,
        }),
        ...mapGetters('gridDesigner', [
            'getChildrenLengthById',
            'getExpandStateById',
        ]),
        filteredGridData() {
            return this.gridData.filter(
                item => item.column < this.columns,
            );
        },
    },
    methods: {
        ...mapActions('gridDesigner', [
            'setGridWhenCollapse',
            'setGridWhenExpand',
            'setHiddenItem',
            'removeHiddenItem',
            'setExpandItem',
        ]),
        toggleItem({
            id, row, column, expanded,
        }) {
            const rowValue = Math.floor(row);

            if (!expanded) {
                const maxChildRow = getMaxChildRow(this.filteredGridData, column, rowValue);
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
            const children = this.filteredGridData.filter(e => e.parent === parent);
            const connectionHeight = this.rowsHeight * (
                row - (children.length ? children[0].row : 0) + 1
            );
            const borderStyle = id === 'ghost_item' ? 'dashed' : 'solid';
            const lineCoordinates = {
                left: parent === 'root' ? `-${this.gridGap}px` : `-${100 - this.gridGap}%`,
                width: parent === 'root' ? `${this.gridGap}px` : `${100 - this.gridGap}%`,
            };

            return {
                borderBottomStyle: borderStyle,
                borderLeftStyle: borderStyle,
                left: lineCoordinates.left,
                width: lineCoordinates.width,
                height: `${connectionHeight}px`,
                bottom: `${this.rowsHeight / 2}px`,
            };
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
