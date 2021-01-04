/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeDesigner
        :items="tree"
        :columns="columns"
        :row-height="rowHeight"
        :grid-gap="16"
        :disabled="disabled"
        @input="onValueChange">
        <template
            #item="{
                item,
                index,
                gap,
            }">
            <ConditionSetTreeDesignerItem
                :key="item.id"
                :item="item"
                :condition="conditions[item.type]"
                :gap="gap"
                :scope="scope"
                :change-values="changeValues"
                :errors="conditionErrors[`element-${index}`]"
                :disabled="disabled"
                @remove="onRemoveCondition" />
        </template>
    </TreeDesigner>
</template>

<script>
import ConditionSetTreeDesignerItem from '@Conditions/components/TreeDesigners/ConditionSetTreeDesignerItem';
import {
    COLUMNS,
    CONTEXT_NAME,
    ROW_HEIGHT,
} from '@Conditions/defaults/conditionsDesigner';
import TreeDesigner from '@UI/components/TreeDesigner/TreeDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetTreeDesigner',
    components: {
        ConditionSetTreeDesignerItem,
        TreeDesigner,
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
            'tree',
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
            '__setState',
            'getCondition',
            'removeConditionValue',
            'setConditionValue',
        ]),
        ...mapActions('gridDesigner', [
            'removeGridItem',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onValueChange(value) {
            this.__setState({
                key: 'tree',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'conditionSetTreeDesigner',
                value,
            });
        },
        onRemoveCondition(item) {
            this.removeConditionValue(item.id);
            this.removeGridItem(item.row);
        },
    },
};
</script>
