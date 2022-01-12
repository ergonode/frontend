/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalFixedScroll>
        <div class="tree-designer">
            <Designer
                :columns="columns"
                :row-height="rowHeight"
                :last-item-row="localItems.length">
                <template #appendBody="{ layerStyle }">
                    <TreeDesignerDraggableLayer
                        :style="layerStyle"
                        :single-root="singleRoot"
                        :items="localItems"
                        :hidden-items="hiddenItems"
                        :children-length="childrenLength"
                        :disabled="disabled"
                        @update-items="onUpdateItems"
                        @update-item="onUpdateItem"
                        @insert-item="onInsertItem"
                        @add-item="onAddItem"
                        @remove-item="onRemoveItem"
                        @remove-items="onRemoveItems"
                        @shift-items="onShiftItems"
                        @expand-item="onExpandItem"
                        @drop-item="onDropItem">
                        <DesignerPlaceholderItem
                            v-if="localItems.length === 0"
                            :gap="gridGap"
                            :row-height="rowHeight" />
                        <DesignerGhostItem
                            v-if="ghostIndex !== -1"
                            :row="ghostIndex.row"
                            :column="ghostIndex.column"
                            :gap="gridGap"
                            :row-height="rowHeight" />
                        <template v-for="item in itemsWithoutGhost">
                            <slot
                                name="item"
                                :item="item"
                                :gap="gridGap"
                                :children-length="childrenLength[item.id]"
                                :disabled="disabled"
                                :is-expanded="typeof hiddenItems[item.id] === 'undefined'"
                                :on-expand-item="onExpandItem"
                                :on-remove-items="onRemoveItems">
                                <TreeDesignerItem
                                    :key="item.id"
                                    :item="item"
                                    :gap="gridGap"
                                    :children-length="childrenLength[item.id]"
                                    :disabled="disabled"
                                    :is-expanded="typeof hiddenItems[item.id] === 'undefined'"
                                    @expand-item="onExpandItem"
                                    @remove-item="onRemoveItems">
                                    <template #description>
                                        <slot
                                            name="itemDescription"
                                            :item="item"
                                            :children-length="childrenLength[item.id]" />
                                    </template>
                                </TreeDesignerItem>
                            </slot>
                        </template>
                        <TreeDesignerConnectionLine
                            v-for="item in connectionLines"
                            :key="`${item.id}-line|${item.row}|${item.column}`"
                            :items="localItems"
                            :row="item.row"
                            :column="item.column"
                            :row-height="rowHeight"
                            :gap="gridGap"
                            :border-style="item.id === 'ghost_item' ? 'dashed' : 'solid'" />
                    </TreeDesignerDraggableLayer>
                </template>
            </Designer>
        </div>
    </VerticalFixedScroll>
</template>

<script>
import {
    insertValueAtIndex,
    insertValuesAtIndex,
    removeArrayIndexes,
} from '@Core/models/arrayWrapper';
import {
    getMergedTreeData,
} from '@Core/models/mappers/treeDesignerMapper';
import {
    deepClone,
} from '@Core/models/objectWrapper';
import Designer from '@UI/components/Designer/Designer';
import DesignerGhostItem from '@UI/components/Designer/DesignerGhostItem';
import DesignerPlaceholderItem from '@UI/components/Designer/DesignerPlaceholderItem';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
import {
    COLUMNS,
    GRID_GAP,
    ROW_HEIGHT,
} from '@UI/defaults/designer';
import {
    mapState,
} from 'vuex';

export default {
    name: 'TreeDesigner',
    components: {
        VerticalFixedScroll,
        DesignerPlaceholderItem,
        Designer,
        DesignerGhostItem,
    },
    props: {
        /**
         * List of items
         */
        items: {
            type: Array,
            default: () => [],
        },
        /**
         * Determines edit mode state
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Space between each item
         */
        gridGap: {
            type: Number,
            default: GRID_GAP,
        },
        singleRoot: {
            type: Boolean,
            default: false,
        },
        /**
         * Number of visible columns
         */
        columns: {
            type: Number,
            default: COLUMNS,
        },
        /**
         * Determines the row height
         */
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT,
        },
    },
    data() {
        return {
            hiddenItems: {},
            localItems: [],
        };
    },
    computed: {
        ...mapState('draggable', [
            'ghostIndex',
        ]),
        connectionLines() {
            return this.localItems.filter(item => item.column > 0);
        },
        itemsWithoutGhost() {
            return this.localItems.filter(item => item.id !== 'ghost_item');
        },
        childrenLength() {
            const childrenLength = {};

            this.localItems.forEach((item) => {
                if (typeof childrenLength[item.parent] === 'undefined') {
                    childrenLength[item.parent] = 0;
                }

                childrenLength[item.parent] += 1;

                if (this.hiddenItems[item.id]) {
                    this.hiddenItems[item.id].forEach((hiddenItem) => {
                        if (hiddenItem.parent === item.id) {
                            if (typeof childrenLength[hiddenItem.parent] === 'undefined') {
                                childrenLength[hiddenItem.parent] = 0;
                            }

                            childrenLength[hiddenItem.parent] += 1;
                        }
                    });
                }
            });

            return childrenLength;
        },
    },
    created() {
        this.localItems = deepClone(this.items);
    },
    methods: {
        onValueChange() {
            this.$emit('input', getMergedTreeData(this.localItems, this.hiddenItems));
        },
        onUpdateItems({
            since,
            till,
            ghostShiftRow,
            ghostColumn,
            shiftRow,
            parentId,
        }) {
            for (let i = since; i <= till; i += 1) {
                if (this.localItems[i].id === 'ghost_item') {
                    this.localItems[i].row += ghostShiftRow;
                    this.localItems[i].column = ghostColumn;
                    this.localItems[i].parent = parentId;
                } else {
                    this.localItems[i].row += shiftRow;
                }
            }

            this.localItems.sort((a, b) => a.row - b.row);
        },
        onUpdateItem({
            index,
            item,
        }) {
            this.localItems[index] = item;

            this.localItems = [
                ...this.localItems,
            ];
        },
        onInsertItem({
            index,
            item,
        }) {
            this.localItems = insertValueAtIndex(this.localItems, item, index);
        },
        onAddItem(item) {
            this.localItems.push(item);
        },
        onRemoveItem(index) {
            this.localItems.splice(index, 1);
        },
        onRemoveItems({
            id,
            row,
            column,
        }) {
            const indexesToRemove = [];
            const itemIds = [
                id,
            ];

            if (this.localItems.some(item => item.id === id)) {
                indexesToRemove.push(row);
            }

            if (typeof this.hiddenItems[id] !== 'undefined') {
                for (let i = row + 1; i < this.items.length; i += 1) {
                    const item = this.items[i];

                    if (item.column <= column) {
                        break;
                    }

                    if (typeof this.hiddenItems[item.id] !== 'undefined') {
                        delete this.hiddenItems[item.id];
                    }

                    itemIds.push(item.id);
                }

                delete this.hiddenItems[id];
            } else {
                let i = row + 1;

                while (i < this.localItems.length && this.localItems[i].column > column) {
                    indexesToRemove.push(i);
                    itemIds.push(this.localItems[i].id);

                    i += 1;
                }
            }

            this.onShiftItems({
                since: row + indexesToRemove.length - 1,
                value: -indexesToRemove.length,
            });

            this.localItems = removeArrayIndexes(this.localItems, indexesToRemove);

            this.$emit('remove-items', itemIds);
            this.onValueChange();
        },
        onShiftItems({
            since,
            value,
        }) {
            for (let i = since + 1; i < this.localItems.length; i += 1) {
                this.localItems[i].row += value;
            }
        },
        onDropItem(item) {
            this.$emit('add-item', item);
            this.onValueChange();
        },
        onExpandItem({
            id,
            row,
            column,
        }) {
            if (typeof this.hiddenItems[id] === 'undefined') {
                const indexesToRemove = [];

                let i = row + 1;

                this.hiddenItems[id] = [];

                while (i < this.localItems.length && this.localItems[i].column > column) {
                    const item = this.localItems[i];

                    this.hiddenItems[id].push({
                        ...item,
                    });
                    indexesToRemove.push(i);

                    i += 1;
                }

                const shiftRowValue = i - row;

                this.onShiftItems({
                    since: row + shiftRowValue - 1,
                    value: -(shiftRowValue - 1),
                });

                this.localItems = removeArrayIndexes(this.localItems, indexesToRemove);
            } else {
                const firstChild = this.hiddenItems[id][0];
                const shiftRowValue = this.hiddenItems[id].length;
                const shiftColumnValue = this.localItems[row].column - firstChild.column + 1;

                for (let i = 0; i < this.hiddenItems[id].length; i += 1) {
                    this.hiddenItems[id][i].row = row + i + 1;
                    this.hiddenItems[id][i].column += shiftColumnValue;
                }

                this.onShiftItems({
                    since: row,
                    value: shiftRowValue,
                });

                this.localItems = insertValuesAtIndex(
                    this.localItems,
                    this.hiddenItems[id],
                    row + 1,
                );

                delete this.hiddenItems[id];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .tree-designer {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        height: 100%;
        padding: 24px 24px 0;
    }
</style>
