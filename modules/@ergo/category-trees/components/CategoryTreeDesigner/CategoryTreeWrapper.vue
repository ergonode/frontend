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
            <TemplateGridHeader :columns="columns" />
        </template>
        <template
            #gridItem="{item, toggleItem, removeItem}">
            <CategoryTreeItem
                :number-of-children="getChildrenLengthById(item.id)"
                :is-expanded="getExpandStateById(item.id)"
                :item="item"
                @toggleItem="toggleItem(item)"
                @removeItem="removeItem(item)" />
        </template>
    </TemplateGridWrapper>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TemplateGridWrapper from '@Core/components/TemplateGrid/TemplateGridWrapper';
import TemplateGridHeader from '@Core/components/TemplateGrid/TemplateGridHeader';
import CategoryTreeItem from '@Trees/components/CategoryTreeDesigner/CategoryTreeItem';

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
            rowHeight: state => state.rowHeight,
        }),
        ...mapGetters('gridDesigner', [
            'getChildrenLengthById',
            'getExpandStateById',
        ]),
    },
};
</script>
