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
        :menu-items="menuItems"
        :menu-position="{ right: '8px' }"
        @select-menu-option="onSelectValue">
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
        <template #description>
            <slot name="description" />
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
    name: 'TreeDesignerItem',
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
    computed: {
        menuItems() {
            return [
                'Remove',
            ];
        },
        title() {
            return this.item.title;
        },
        subtitle() {
            if (!this.childrenLength) {
                return '';
            }

            return `Nodes: ${this.childrenLength}`;
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
    methods: {
        onExpandItem() {
            this.$emit('expand-item', this.item);
        },
        onSelectValue(option) {
            switch (option) {
            case 'Remove':
                this.$emit('remove-item', this.item);
                break;
            default: break;
            }
        },
    },
};
</script>
