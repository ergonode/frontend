/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeDesigner
        :single-root="true"
        :items="inheritedLanguagesTree"
        :columns="columns"
        :row-height="rowHeight"
        :disabled="!isAllowedToUpdate"
        @remove-items="onRemoveLanguageItems"
        @add-item="onAddItem"
        @input="onValueChange">
        <template
            #item="{
                item,
                gap,
                disabled,
                isExpanded,
                childrenLength,
                onExpandItem,
                onRemoveItems,
            }">
            <LanguageInheritanceTreeDesignerItem
                :key="item.id"
                :item="item"
                :gap="gap"
                :children-length="childrenLength"
                :is-expanded="isExpanded"
                :disabled="disabled"
                @expand-item="onExpandItem"
                @remove-item="onRemoveItems" />
        </template>
    </TreeDesigner>
</template>

<script>
import LanguageInheritanceTreeDesignerItem from '@Core/components/LanguageInheritanceTreeDesigner/LanguageInheritanceTreeDesignerItem';
import PRIVILEGES from '@Core/config/privileges';
import {
    COLUMNS,
    ROW_HEIGHT,
} from '@Core/defaults/languagesDesigner';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LanguageInheritanceTreeDesigner',
    components: {
        LanguageInheritanceTreeDesignerItem,
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
    created() {
        this.inheritedLanguagesTree.forEach((node) => {
            this.setDisabledScopeElement({
                scope: this.scope,
                disabledElement: {
                    languageCode: this.languageCode,
                    elementId: node.id,
                    disabled: true,
                },
            });
        });
    },
    methods: {
        ...mapActions('core', [
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
                return this.$t('@Core.core.components.LanguageInheritanceTreeDesigner.itemSubtitle', {
                    info: childrenLength,
                });
            }
            return '';
        },
        onRemoveLanguageItems(ids) {
            ids.forEach((id) => {
                this.removeDisabledScopeElement({
                    languageCode: this.languageCode,
                    elementId: id,
                    scope: this.scope,
                });
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'languagesInheritanceTreeDesigner',
                value: this.inheritedLanguagesTree,
            });
        },
        onAddItem(item) {
            this.setDisabledScopeElement({
                scope: this.scope,
                disabledElement: {
                    languageCode: this.languageCode,
                    elementId: item.id,
                    disabled: true,
                },
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
