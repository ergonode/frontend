/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :columns="columns"
        :rows-height="rowsHeight"
        :is-connections-visible="false"
        :method-after-drop="getConditionConfiguration"
        :method-after-remove="removeConditionFromSet"
        :grid-gap="15"
        :is-dragging-enabled="$hasAccess('SEGMENT_UPDATE')">
        <template #gridHeader>
            <TemplateGridHeader
                :style="gridStyles()"
                header-name="condition level"
                :columns="columns" />
        </template>
        <template #gridItem="{item}">
            <ConditionSetItem
                :condition="getCondition(item.id)"
                :item-id="item.id"
                :item-row="item.row" />
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
            'removeCondition',
        ]),
        getCondition(id) {
            const [correctId] = id.split('--');
            return this.conditions[correctId] || {};
        },
        getConditionConfiguration({ id }) {
            const [correctId] = id.split('--');
            if (!this.conditions[correctId]) {
                this.getConditionById({ conditionId: correctId });
            }
        },
        removeConditionFromSet({ id }) {
            this.removeCondition(id);
        },
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: '50px',
            };
        },
    },
};
</script>
