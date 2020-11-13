/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridWrapper
        :scope="scope"
        :change-values="changeValues"
        :errors="errors"
        :columns="columns"
        :row-height="rowHeight"
        :is-connections-visible="false"
        :grid-gap="16"
        :is-dragging-enabled="!disabled"
        :is-multi-draggable="true"
        :context-name="contextName"
        @after-drop="onGetConditionConfiguration"
        @remove="onRemoveCondition">
        <template
            #gridItem="{
                item,
                index,
                gridItemStyles,
            }">
            <ConditionSetItem
                :style="gridItemStyles"
                :condition="getCondition(item.id)"
                :item="item"
                :scope="scope"
                :change-values="changeValues"
                :errors="conditionErrors[`element-${index}`]"
                :disabled="disabled"
                @remove="onRemoveCondition" />
        </template>
    </TemplateGridWrapper>
</template>

<script>
import ConditionSetItem from '@Conditions/components/ConditionSetDesigner/ConditionSetItem';
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
        ConditionSetItem,
        TemplateGridWrapper,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        scope: {
            type: String,
            default: '',
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ...mapState('condition', [
            'conditions',
        ]),
        contextName() {
            return CONTEXT_NAME;
        },
        columns() {
            return COLUMNS;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
        conditionErrors() {
            return this.errors.conditions || {};
        },
    },
    methods: {
        ...mapActions('condition', [
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
                    id: correctId,
                });
            }
            this.setConditionValue({
                conditionId: id,
                parameterName: null,
                parameterValue: null,
            });
        },
        onRemoveCondition(item) {
            this.removeConditionValue(item.id);
            this.removeGridItem(item.row);
        },
    },
};
</script>
