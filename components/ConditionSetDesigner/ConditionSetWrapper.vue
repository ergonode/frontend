/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :grid-styles="gridStyles()"
        :columns="columns"
        :rows-height="rowsHeight"
        :grid-gap="0"
        :is-connections-visible="false"
        :method-after-drop="getConditionConfiguration"
    >
        <template slot="gridHeader">
            <TemplateGridHeader
                :style="gridStyles(50)"
                header-name="condition level"
                :columns="columns" />
        </template>
        <template
            slot="gridItem"
            slot-scope="{item}">
            <ConditionSetItem
                :condition="conditions[item.id] || {}"
                :item-id="item.id" />
        </template>
    </TemplateGridWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TemplateGridWrapper from '~/components/TemplateGrid/TemplateGridWrapper';
import TemplateGridHeader from '~/components/TemplateGrid/TemplateGridHeader';

export default {
    name: 'ConditionSetWrapper',
    components: {
        TemplateGridWrapper,
        TemplateGridHeader,
        ConditionSetItem: () => import('~/components/ConditionSetDesigner/ConditionSetItem'),
    },
    computed: {
        ...mapState('conditions', {
            columns: state => state.columns,
            rowsHeight: state => state.rowsHeight,
            conditions: state => state.conditions,
        }),
    },
    methods: {
        ...mapActions('conditions', [
            'getConditionById',
        ]),
        getConditionConfiguration({ id }) {
            if (!this.conditions[id]) {
                this.getConditionById({ conditionId: id });
            }
        },
        gridStyles(rowHeight) {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${rowHeight || this.rowsHeight}px`,
            };
        },
    },
};
</script>
