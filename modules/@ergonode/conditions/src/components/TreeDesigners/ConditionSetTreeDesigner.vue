/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeDesigner
        :items="tree"
        :columns="columns"
        :row-height="rowHeight"
        :grid-gap="gridGap"
        :disabled="disabled"
        @add-item="onAddItem"
        @remove-items="onRemoveConditions"
        @input="onValueChange">
        <template
            #item="{
                item,
                gap,
                onRemoveItems,
            }">
            <ConditionSetTreeDesignerItem
                :key="item.id"
                :item="item"
                :condition="conditions[item.type]"
                :gap="gap"
                :scope="scope"
                :change-values="changeValues"
                :errors="conditionErrors[item.id]"
                :disabled="disabled"
                :is-prefetching-data="
                    fetchingTypes[item.type]
                        || typeof fetchingTypes[item.type] === 'undefined'"
                @remove="onRemoveItems" />
        </template>
    </TreeDesigner>
</template>

<script>
import ConditionSetTreeDesignerItem from '@Conditions/components/TreeDesigners/ConditionSetTreeDesignerItem';
import {
    COLUMNS,
    GRID_GAP,
    ROW_HEIGHT,
} from '@Conditions/defaults/treeDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetTreeDesigner',
    components: {
        ConditionSetTreeDesignerItem,
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
    async fetch() {
        const requests = [];

        this.tree.forEach((node) => {
            if (!this.conditions[node.type] && !this.fetchingTypes[node.type]) {
                this.fetchingTypes[node.type] = true;

                requests.push(this.getCondition({
                    id: node.type,
                    onSuccess: this.getConditionSuccess,
                    onError: this.getConditionError,
                }));
            }
        });

        await Promise.all(requests);
    },
    data() {
        return {
            fetchingTypes: {},
        };
    },
    computed: {
        ...mapState('condition', [
            'tree',
            'conditions',
        ]),
        columns() {
            return COLUMNS;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
        gridGap() {
            return GRID_GAP;
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
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onAddItem({
            type,
        }) {
            if (!this.conditions[type] && !this.fetchingTypes[type]) {
                this.fetchingTypes[type] = true;

                this.getCondition({
                    id: type,
                    onSuccess: this.getConditionSuccess,
                    onError: this.getConditionError,
                });
            }
        },
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
        onRemoveConditions(ids) {
            ids.forEach((id) => {
                this.removeConditionValue(id);
            });
        },
        getConditionSuccess(type) {
            this.fetchingTypes[type] = false;
        },
        getConditionError(type) {
            this.fetchingTypes[type] = false;
        },
    },
};
</script>
