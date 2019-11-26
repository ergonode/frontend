/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :columns="columns"
        :row-height="rowHeight"
        :is-dragging-enabled="$hasAccess(['CATEGORY_TREE_UPDATE'])">
        <template #gridHeader>
            <TemplateGridHeader
                :style="gridStyles"
                :columns="columns" />
        </template>
        <template
            #gridItem="{item, toggleItem, removeItem}">
            <CategoryTreeItem
                :number-of-children="getChildrenLengthById(item.id)"
                :is-expanded="getExpandStateById(item.id)"
                :item-name="item.name || item.code"
                @toggleItem="toggleItem(item)"
                @removeItem="removeItem(item)" />
        </template>
    </TemplateGridWrapper>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TemplateGridWrapper from '~/components/TemplateGrid/TemplateGridWrapper';
import TemplateGridHeader from '~/components/TemplateGrid/TemplateGridHeader';
import CategoryTreeItem from '~/components/CategoryTreeDesigner/CategoryTreeItem';

export default {
    name: 'CategoryTreeWrapper',
    components: {
        TemplateGridWrapper,
        TemplateGridHeader,
        CategoryTreeItem,
    },
    computed: {
        ...mapState('tree', {
            columns: (state) => state.treeLevels,
            rowHeight: (state) => state.rowHeight,
        }),
        ...mapGetters('gridDesigner', [
            'getChildrenLengthById',
            'getExpandStateById',
        ]),
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowHeight}px`,
            };
        },
    },
};
</script>
