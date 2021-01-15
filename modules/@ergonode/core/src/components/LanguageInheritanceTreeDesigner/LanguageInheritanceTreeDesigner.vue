/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeDesigner
        :single-root="true"
        :items="inheritedLanguagesTree"
        :columns="columns"
        :row-height="rowHeight"
        :disabled="!isAllowedToUpdate"
        @remove-items="onRemoveItems"
        @add-item="onAddItem"
        @input="onValueChange">
        <template #itemDescription="{ item, childrenLength }">
            <DesignerItemDescription
                :title="item.name || `#${item.code}`"
                :subtitle="childrenLength ? `Inherited languages: ${childrenLength}` : ''" />
        </template>
    </TreeDesigner>
</template>

<script>
import PRIVILEGES from '@Core/config/privileges';
import {
    COLUMNS,
    ROW_HEIGHT,
} from '@Core/defaults/languagesDesigner';
import DesignerItemDescription from '@UI/components/Designer/DesignerItemDescription';
import TreeDesigner from '@UI/components/TreeDesigner/TreeDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LanguageInheritanceTreeDesigner',
    components: {
        TreeDesigner,
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
        ...mapState('core', [
            'inheritedLanguagesTree',
        ]),
        columns() {
            return COLUMNS;
        },
        rowHeight() {
            return ROW_HEIGHT;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
    },
    methods: {
        ...mapActions('core', [
            '__setState',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        ...mapActions('list', [
            'removeDisabledElement',
            'setDisabledElement',
        ]),
        onRemoveItems(ids) {
            ids.forEach((id) => {
                this.removeDisabledElement({
                    languageCode: this.languageCode,
                    elementId: id,
                });
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'languagesInheritanceTreeDesigner',
                value: this.inheritedLanguagesTree,
            });
        },
        onAddItem(item) {
            this.setDisabledElement({
                languageCode: this.languageCode,
                elementId: item.id,
                disabled: true,
            });
        },
        onValueChange(value) {
            this.__setState({
                key: 'inheritedLanguagesTree',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'languagesInheritanceTreeDesigner',
                value,
            });
        },
    },
};
</script>
