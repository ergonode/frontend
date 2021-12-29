/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DesignerItem
        :row="item.row"
        :column="item.column"
        :gap="gap"
        :title="title"
        :subtitle="subtitle"
        :disabled="disabled"
        :menu-items="menuItemsIds"
        :menu-position="{ right: '8px' }"
        @select-menu-option="menuItemsAction">
        <template #prepend>
            <IconButton
                v-if="hasChildren"
                :size="tinySize"
                :theme="secondaryPlainTheme"
                @click.native="onExpandItem">
                <template #icon>
                    <IconArrowDouble :state="buttonExpanderIconState" />
                </template>
            </IconButton>
        </template>
    </DesignerItem>
</template>
<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import DesignerItem from '@UI/components/Designer/DesignerItem';

export default {
    name: 'LanguageInheritanceTreeDesignerItem',
    components: {
        DesignerItem,
    },
    props: {
        /**
         * Item data model
         */
        item: {
            type: Object,
            required: true,
        },
        gap: {
            type: Number,
            default: 8,
        },
        childrenLength: {
            type: Number,
            default: 0,
        },
        isExpanded: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines edit mode state
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            menuItems: [
                {
                    id: 'Remove',
                    action: () => {
                        this.$emit('remove-item', this.item);
                    },
                },
            ],
        };
    },
    computed: {
        menuItemsIds() {
            return this.menuItems.map(item => item.id);
        },
        title() {
            return this.item.name || `#${this.item.code}`;
        },
        subtitle() {
            if (this.childrenLength) {
                return this.$t('@Core.core.components.LanguageInheritanceTreeDesigner.itemSubtitle', {
                    info: this.childrenLength,
                });
            }
            return '';
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        hasChildren() {
            return this.childrenLength > 0;
        },
        buttonExpanderIconState() {
            return this.isExpanded ? ARROW.DOWN : ARROW.UP;
        },
    },
    async mounted() {
        const extendedItems = await this.$getExtendMethod('@Core/components/LanguageInheritanceTreeDesigner/LanguageInheritanceTreeDesignerItem/menuItems', {
            $this: this,
            props: {
                item: this.item,
            },
        });

        this.menuItems = [].concat(this.menuItems, ...extendedItems);
    },
    methods: {
        onExpandItem() {
            this.$emit('expand-item', this.item);
        },
        menuItemsAction(option) {
            this.menuItems.find(item => item.id === option).action();
        },
    },
};
</script>
