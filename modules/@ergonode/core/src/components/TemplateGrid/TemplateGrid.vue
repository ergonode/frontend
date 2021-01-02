/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Designer
        :columns="columns"
        :row-height="rowHeight"
        :last-item-row="gridData.length">
        <template #body="{ layerStyle }">
            <TemplateGridDraggableLayer
                :style="layerStyle"
                :constant-root="constantRoot"
                :grid-data="gridData"
                :hidden-items="hiddenItems"
                :is-dragging-enabled="isDraggingEnabled"
                :is-multi-draggable="isMultiDraggable"
                @expand="onExpandItem"
                @remove="removeItemOnDrop">
                <TemplateGridGhostItem
                    v-if="ghostIndex !== -1"
                    :row="ghostIndex.row"
                    :column="ghostIndex.column"
                    :gap="gridGap"
                    :context-name="contextName" />
                <TemplateGridItem
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :gap="gridGap"
                    :context-name="contextName"
                    :children-length="childrenLength[item.id]"
                    :is-expanded="typeof hiddenItems[item.id] === 'undefined'"
                    :is-dragging-enabled="isDraggingEnabled"
                    @expand="onExpandItem"
                    @remove-item="removeItem(item)" />
                <TemplateGirdItemLine
                    v-for="item in connectionLines"
                    :key="`${item.id}-line|${item.row}|${item.column}`"
                    :grid-data="gridData"
                    :row="item.row"
                    :column="item.column"
                    :row-height="rowHeight"
                    :gap="gridGap"
                    :is-ghost="item.id === 'ghost_item'" />
            </TemplateGridDraggableLayer>
        </template>
    </Designer>
</template>

<script>
import TemplateGirdItemLine from '@Core/components/TemplateGrid/TemplateGirdItemLine';
import TemplateGridDraggableLayer from '@Core/components/TemplateGrid/TemplateGridDraggableLayer';
import TemplateGridGhostItem from '@Core/components/TemplateGrid/TemplateGridGhostItem';
import TemplateGridItem from '@Core/components/TemplateGrid/TemplateGridItem';
import Designer from '@UI/components/Designer/Designer';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateGrid',
    components: {
        Designer,
        TemplateGridDraggableLayer,
        TemplateGridGhostItem,
        TemplateGridItem,
        TemplateGirdItemLine,
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
        ...mapState('gridDesigner', [
            'gridData',
        ]),
        connectionLines() {
            return this.gridData.filter(item => item.column > 0);
        },
        items() {
            return this.gridData.filter(item => item.id !== 'ghost_item');
        },
        childrenLength() {
            const childrenLength = {};

            this.gridData.forEach((item) => {
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
    methods: {
        ...mapActions('gridDesigner', [
            'setGridWhenExpand',
            'setChildrenLength',
            'setHiddenItem',
            'removeHiddenItem',
            'setExpandItem',
            'removeGridItem',
            '',
            'shiftItems',
            'removeItems',
            'insertItemsSince',
        ]),
        ...mapActions('list', [
            'removeDisabledElement',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onExpandItem({
            id,
            row,
            parent,
        }) {
            if (typeof this.hiddenItems[id] === 'undefined') {
                const indexesToRemove = [];

                let i = row + 1;

                this.hiddenItems[id] = [];

                while (i < this.gridData.length && this.gridData[i].parent !== parent) {
                    const item = this.gridData[i];

                    this.hiddenItems[id].push({
                        ...item,
                    });
                    indexesToRemove.push(i);

                    i += 1;
                }

                const shiftValue = i - row;

                this.shiftItems({
                    since: row + shiftValue - 1,
                    value: -(shiftValue - 1),
                });
                this.removeItems(indexesToRemove);
            } else {
                const shiftValue = this.hiddenItems[id].length;

                for (let i = 0; i < this.hiddenItems[id].length; i += 1) {
                    this.hiddenItems[id][i].row = row + i + 1;
                }

                this.shiftItems({
                    since: row,
                    value: shiftValue,
                });

                this.insertItemsSince({
                    items: [
                        ...this.hiddenItems[id],
                    ],
                    since: row + 1,
                });

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
