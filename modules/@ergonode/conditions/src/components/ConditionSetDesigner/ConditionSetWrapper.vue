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
        :is-dragging-enabled="!disabled"
        :is-multi-draggable="true"
        :context-name="contextName"
        @afterDrop="onGetConditionConfiguration"
        @afterRemove="removeConditionValue">
        <template #gridItem="{item, gridItemStyles}">
            <ConditionSetItem
                :style="gridItemStyles"
                :condition="getCondition(item.id)"
                :item-id="item.id"
                :item-row="item.row"
                :disabled="disabled"
                @remove="removeCondition" />
        </template>
    </TemplateGridWrapper>
</template>

<script>
import {
    COLUMNS,
    CONTEXT_NAME,
    ROW_HEIGHT,
} from '@Conditions/defaults/conditionsDesigner';
import TemplateGridWrapper from '@Core/components/TemplateGrid/TemplateGridWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetWrapper',
    components: {
        TemplateGridWrapper,
        ConditionSetItem: () => import('@Conditions/components/ConditionSetDesigner/ConditionSetItem'),
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('conditions', {
            conditions: state => state.conditions,
        }),
        contextName() {
            return CONTEXT_NAME;
        },
        columns() {
            return COLUMNS;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
    },
    methods: {
        ...mapActions('conditions', [
            'getConditionConfiguration',
            'removeConditionValue',
            'setConditionValue',
        ]),
        ...mapActions('gridDesigner', [
            'removeGridItem',
        ]),
        getCondition(id) {
            const [
                correctId,
            ] = id.split('--');
            return this.conditions[correctId] || {};
        },
        onGetConditionConfiguration(id) {
            const [
                correctId,
            ] = id.split('--');

            if (!this.conditions[correctId]) {
                this.getConditionConfiguration({
                    conditionId: correctId,
                });
            }
            this.setConditionValue({
                conditionId: id,
                parameterName: null,
                parameterValue: null,
            });
        },
        removeCondition(row, id) {
            this.removeConditionValue(id);
            this.removeGridItem(row);
        },
    },
};
</script>
