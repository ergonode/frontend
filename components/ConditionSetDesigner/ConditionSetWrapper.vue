/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :grid-styles="gridStyles"
        :columns="columns"
        :rows-height="rowsHeight"
        :grid-gap="0"
        :is-connections-visible="false"
        :method-after-drop="getConditionConfiguration"
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
    methods: {
        ...mapActions('conditions', [
            'getConditionById',
        ]),
        getConditionConfiguration({ id }) {
            if (!this.conditions[id]) {
                this.getConditionById({ conditionId: id });
            }
        },
    },
};
</script>
