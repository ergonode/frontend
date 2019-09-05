/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :grid-styles="gridStyles"
        :columns="columns"
        :rows-height="rowsHeight"
        :grid-gap="4"
        :is-connections-visible="false"
    >
        <template slot="gridHeader">
            <TemplateGridHeader
                :style="gridHeaderStyles"
                header-name="condition level"
                :columns="columns" />
        </template>
        <template
            slot="item"
            slot-scope="{item}">
            <ConditionSetItem
                :item-name="item.name || item.code" />
        </template>
    </TemplateGridWrapper>
</template>

<script>
import { mapState } from 'vuex';
import TemplateGridWrapper from '~/components/TemplateGrid/TemplateGridWrapper';
import TemplateGridHeader from '~/components/TemplateGrid/TemplateGridHeader';
import ConditionSetItem from '~/components/ConditionSetDesigner/ConditionSetItem';

export default {
    name: 'ConditionSetWrapper',
    components: {
        TemplateGridWrapper,
        TemplateGridHeader,
        ConditionSetItem,
    },
    computed: {
        ...mapState('segments', {
            columns: state => state.columns,
            rowsHeight: state => state.rowsHeight,
        }),
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        gridHeaderStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: '50px',
            };
        },
    },
};
</script>
