/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Designer
        :columns="columns"
        :row-height="rowHeight"
        :last-item-row="localItems.length">
        <template #body="{ layerStyle }">
            <TreeDesignerDraggableLayer
                :style="layerStyle"
                :constant-root="constantRoot"
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
                @drop="onDropItem">
                <TemplateGridGhostItem
                    v-if="ghostIndex !== -1"
                    :row="ghostIndex.row"
                    :column="ghostIndex.column"
                    :gap="gridGap"
                    :context-name="contextName" />
                <TreeDesignerItem
                    v-for="item in itemsWithoutGhost"
                    :key="item.id"
                    :item="item"
                    :gap="gridGap"
                    :context-name="contextName"
                    :children-length="childrenLength[item.id]"
                    :disabled="disabled"
                    :is-expanded="typeof hiddenItems[item.id] === 'undefined'"
                    @expand-item="onExpandItem"
                    @remove-item="removeItem(item)" />
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
</template>

<script>
import {
    insertValueAtIndex,
    insertValuesAtIndex,
    removeArrayIndexes,
} from '@Core/models/arrayWrapper';
import Designer from '@UI/components/Designer/Designer';
import TemplateGridGhostItem from '@UI/components/TreeDesigner/TemplateGridGhostItem';
import TreeDesignerConnectionLine from '@UI/components/TreeDesigner/TreeDesignerConnectionLine';
import TreeDesignerDraggableLayer from '@UI/components/TreeDesigner/TreeDesignerDraggableLayer';
import TreeDesignerItem from '@UI/components/TreeDesigner/TreeDesignerItem';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TreeDesigner',
    components: {
        Designer,
        TreeDesignerDraggableLayer,
        TemplateGridGhostItem,
        TreeDesignerItem,
        TreeDesignerConnectionLine,
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
            default: 8,
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
         * Determines the row height
         */
        rowHeight: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            hiddenItems: {},
            localItems: [],
        };
    },
    computed: {
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('draggable', [
            'ghostIndex',
        ]),
        ...mapState('list', [
            'disabledElements',
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
            });

            Object.keys(this.hiddenItems).forEach((key) => {
                if (typeof childrenLength[key] === 'undefined') {
                    childrenLength[key] = 0;
                }

                childrenLength[key] += this.hiddenItems[key].length;
            });

            return childrenLength;
        },
    },
    watch: {
        items: {
            immediate: true,
            handler() {
                this.localItems = JSON.parse(JSON.stringify(this.items));
            },
        },
    },
    methods: {
        ...mapActions('gridDesigner', [
            'setGridWhenExpand',
            'setChildrenLength',
            'setHiddenItem',
            'removeHiddenItem',
            'setExpandItem',
            'removeGridItem',
            '',
        ]),
        ...mapActions('list', [
            'removeDisabledElement',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onValueChange() {
            this.$emit('input', JSON.parse(JSON.stringify(this.localItems)));
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

            this.onValueChange();
        },
        onAddItem(item) {
            this.localItems.push(item);

            this.onValueChange();
        },
        onRemoveItem(index) {
            const item = this.localItems[index];

            this.localItems.splice(index, 1);

            this.$emit('remove-items', [
                item.id,
            ]);
            this.onValueChange();
        },
        onRemoveItems(id) {
            let itemIds = [
                id,
            ];

            if (typeof this.hiddenItems[id] !== 'undefined') {
                itemIds = [
                    id,
                    ...this.hiddenItems[id].map(item => item.id),
                ];

                delete this.hiddenItems[id];
            }

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
            this.$emit('drop', item);
        },
        onExpandItem({
            id,
            row,
        }) {
            if (typeof this.hiddenItems[id] === 'undefined') {
                const indexesToRemove = [];

                let i = row + 1;

                this.hiddenItems[id] = [];

                while (this.localItems[i].parent === id) {
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
        removeItemOnDrop(item) {
            this.removeDisabledElementsOnList(item.id);

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'designer',
                value: true,
            });

            this.$emit('remove', item);
        },
        removeItem(item) {
            const {
                id, row, parent,
            } = item;

            this.onExpandItem(item);
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
    .template-grid {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        height: 0;
        padding: 24px 24px 0;
        overflow: auto;
    }
</style>
