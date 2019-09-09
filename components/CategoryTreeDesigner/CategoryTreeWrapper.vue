/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :grid-styles="gridStyles"
        :columns="columns"
        :rows-height="rowsHeight"
    >
        <template slot="gridHeader">
            <TemplateGridHeader
                :style="gridStyles"
                :columns="columns" />
        </template>
        <template
            slot="gridItem"
            slot-scope="{item, toggleItemMethod, getChildrenLengthMethod, getExpandStateMethod }">
            <CategoryTreeItem
                :number-of-children="getChildrenLengthMethod(item.id)"
                :is-expanded="getExpandStateMethod(item.id)"
                :item-name="item.name || item.code"
                @toggleItem="toggleItemMethod(item)" />
        </template>
    </TemplateGridWrapper>
</template>

<script>
import { mapState } from 'vuex';
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
            columns: state => state.treeLevels,
            rowsHeight: state => state.rowsHeight,
        }),
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
    },
};
</script>
