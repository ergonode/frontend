/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeDesigner
        :items="gridData"
        :columns="columns"
        :row-height="rowHeight"
        :context-name="contextName"
        :disabled="!isAllowedToUpdate"
        @input="onValueChange" />
</template>

<script>
import PRIVILEGES from '@Trees/config/privileges';
import {
    COLUMNS,
    CONTEXT_NAME,
    ROW_HEIGHT,
} from '@Trees/defaults/designer';
import TreeDesigner from '@UI/components/TreeDesigner/TreeDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeDesigner',
    components: {
        TreeDesigner,
    },
    props: {
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
        ...mapState('gridDesigner', [
            'gridData',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
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
        ...mapActions('gridDesigner', [
            '__setState',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onValueChange(value) {
            this.__setState({
                key: 'gridData',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'categoryTreeDesigner',
                value,
            });
        },
    },
};
</script>
