/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeDesigner
        :items="tree"
        :columns="columns"
        :row-height="rowHeight"
        :disabled="!isAllowedToUpdate"
        @remove-items="onRemoveItems"
        @add-item="onAddItem"
        @input="onValueChange">
        <template #itemDescription="{ item, childrenLength }">
            <DesignerItemDescription
                :title="item.name || `#${item.code}`"
                :subtitle="itemSubtitle(childrenLength)" />
        </template>
    </TreeDesigner>
</template>

<script>
import PRIVILEGES from '@Trees/config/privileges';
import {
    COLUMNS,
    ROW_HEIGHT,
} from '@Trees/defaults/designer';
import DesignerItemDescription from '@UI/components/Designer/DesignerItemDescription';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeDesigner',
    components: {
        DesignerItemDescription,
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
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        ...mapState('categoryTree', [
            'tree',
        ]),
        columns() {
            return COLUMNS;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
    },
    methods: {
        ...mapActions('categoryTree', [
            '__setState',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        ...mapActions('list', [
            'removeDisabledScopeElement',
            'setDisabledScopeElement',
        ]),
        itemSubtitle(childrenLength) {
            if (childrenLength) {
                return this.$t('@Trees.tree.components.CategoryTreeDesigner.itemSubtitle', {
                    info: childrenLength,
                });
            }
            return '';
        },
        onRemoveItems(ids) {
            ids.forEach((id) => {
                this.removeDisabledScopeElement({
                    languageCode: this.languageCode,
                    elementId: id,
                    scope: this.scope,
                });
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'categoryTreeDesigner',
                value: this.tree,
            });
        },
        onAddItem({
            id,
        }) {
            this.setDisabledScopeElement({
                scope: this.scope,
                disabledElement: {
                    languageCode: this.languageCode,
                    elementId: id,
                    disabled: true,
                },
            });
        },
        onValueChange(value) {
            this.__setState({
                key: 'tree',
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
