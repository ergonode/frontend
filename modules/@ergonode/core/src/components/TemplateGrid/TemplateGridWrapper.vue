/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-grid-wrapper">
        <TemplateGridContainer
            :columns="columns"
            :rows="rows"
            :row-height="rowHeight"
            :constant-root="constantRoot"
            :grid-data="gridData"
            :hidden-items="hiddenItems"
            :is-dragging-enabled="isDraggingEnabled"
            :is-multi-draggable="isMultiDraggable"
            @expand="onExpandItem"
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
            <TemplateGridItemsContainer :style="gridStyles">
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
                    :is-expanded="typeof hiddenItems[item.id] === 'undefined'"
                    :is-dragging-enabled="isDraggingEnabled"
                    @expand="onExpandItem"
                    @remove-item="removeItem(item)" />
                <TemplateGirdItemLine
                    v-for="item in connectionLines"
                    :key="`${item.id}-line`"
                    :grid-data="gridData"
                    :row="item.row"
                    :column="item.column"
                    :row-height="rowHeight"
                    :gap="gridGap"
                    :is-ghost="item.id === 'ghost_item'" />
            </TemplateGridItemsContainer>
        </TemplateGridContainer>
    </div>
</template>

<script>
import TemplateGirdItemLine from '@Core/components/TemplateGrid/TemplateGirdItemLine';
import TemplateGridContainer from '@Core/components/TemplateGrid/TemplateGridContainer';
import TemplateGridGhostItem from '@Core/components/TemplateGrid/TemplateGridGhostItem';
import TemplateGridItem from '@Core/components/TemplateGrid/TemplateGridItem';
import TemplateGridItemsContainer from '@Core/components/TemplateGrid/TemplateGridItemsContainer';
import TemplateGridPresentationLayer from '@Core/components/TemplateGrid/TemplateGridPresentationLayer';
import {
    getNearestNeighborRowId,
} from '@Core/models/template_grid/TreeCalculations';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateGridWrapper',
    components: {
        TemplateGridPresentationLayer,
        TemplateGridItemsContainer,
        TemplateGridContainer,
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
         * Determines the size of row height
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
            'rows',
            'gridData',
        ]),
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridTemplateRows: `repeat(${this.rows}, ${this.rowHeight}px)`,
            };
        },
        connectionLines() {
            return this.gridData.filter(item => item.column > 0);
        },
        items() {
            return this.gridData.filter(item => item.id !== 'ghost_item');
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

                while (i < this.gridData.length - 1 && this.gridData[i].parent !== parent) {
                    const item = this.gridData[i];

                    this.hiddenItems[id].push({
                        ...item,
                    });
                    indexesToRemove.push(i);

                    i += 1;
                }

                console.log(this.gridData, i);

                const shiftValue = this.gridData[i].row - row;

                // console.log('before:', this.items.map(a => a.row));

                this.shiftItems({
                    since: row + shiftValue - 1,
                    value: -(shiftValue - 1),
                });
                this.removeItems(indexesToRemove);

                // console.log('After:', this.items.map(a => a.row));
            } else {
                const shiftValue = this.hiddenItems[id].length;

                // console.log('before:', this.items.map(i => i.row));

                console.log(row);

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

                // console.log('After:', this.items.map(i => i.row));

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
