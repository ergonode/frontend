/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :columns="columns"
        :row-height="rowHeight"
        :is-connections-visible="false"
        :grid-gap="16"
        :is-dragging-enabled="$hasAccess(['SEGMENT_UPDATE'])"
        :is-multi-draggable="true"
        :dragged-element-size="{ width: 600, height: 60 }"
        @afterDrop="onGetConditionConfigurationById"
        @afterRemove="removeConditionFromSet">
        <template #gridHeader>
            <TemplateGridHeader
                header="condition level"
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
        ...mapState('gridDesigner', {
            gridData: (state) => state.gridData,
        }),
        ...mapState('conditions', {
            columns: (state) => state.columns,
            rowHeight: (state) => state.rowHeight,
            conditions: (state) => state.conditions,
            conditionsValues: (state) => state.conditionsValues,
        }),
    },
    methods: {
        ...mapActions('conditions', [
            'getConditionConfigurationById',
            'removeConditionValue',
        ]),
        getCondition(id) {
            const [correctId] = id.split('--');
            return this.conditions[correctId] || {};
        },
        onGetConditionConfigurationById(id) {
            const [correctId] = id.split('--');
            if (!this.conditions[correctId]) {
                this.getConditionConfigurationById({ conditionId: correctId });
            }
        },
        removeConditionFromSet(id) {
            this.removeConditionValue(id);
        },
    },
};
</script>
