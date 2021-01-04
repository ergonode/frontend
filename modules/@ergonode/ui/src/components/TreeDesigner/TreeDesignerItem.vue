/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        :class="classes"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut">
        <IconButton
            v-if="hasChildren"
            :size="tinySize"
            :theme="secondaryPlainTheme"
            @click.native="onExpandItem">
            <template #icon>
                <IconArrowDouble :state="buttonExpanderIconState" />
            </template>
        </IconButton>
        <slot name="description">
            <DesignerItemDescription
                :title="title"
                :subtitle="subtitle" />
        </slot>
        <div
            v-if="!disabled"
            :class="['tree-designer-item__contextual-menu', contextualMenuHoveStateClasses]">
            <ActionIconButton
                :theme="secondaryPlainTheme"
                :size="tinySize"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus">
                <template #icon="{ color }">
                    <IconDots :fill-color="color" />
                </template>
            </ActionIconButton>
        </div>
    </div>
</template>
<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ActionIconButton from '@UI/components/ActionIconButton/ActionIconButton';
import DesignerItemDescription from '@UI/components/Designer/DesignerItemDescription';
import IconButton from '@UI/components/IconButton/IconButton';
import IconArrowDouble from '@UI/components/Icons/Arrows/IconArrowDouble';
import IconDots from '@UI/components/Icons/Others/IconDots';

export default {
    name: 'TreeDesignerItem',
    components: {
        IconDots,
        IconArrowDouble,
        ActionIconButton,
        IconButton,
        DesignerItemDescription,
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
            contextualMenuItems: [
                'Remove',
            ],
            isHovered: false,
        };
    },
    computed: {
        styles() {
            const {
                row,
                column,
            } = this.item;

            return {
                gridArea: `${row + 1} / ${column + 1} / ${row + 2} / ${column + 3}`,
                margin: `${this.gap}px`,
            };
        },
        classes() {
            return [
                'tree-designer-item',
                {
                    'tree-designer-item--first-column': this.item.column === 0,
                },
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
        contextualMenuHoveStateClasses() {
            return {
                'tree-designer-item__contextual-menu--hovered': this.isHovered,
            };
        },
    },
    methods: {
        onExpandItem() {
            this.$emit('expand-item', this.item);
        },
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(option) {
            switch (option) {
            case 'Remove':
                this.$emit('remove-item', this.item.id);
                break;
            default: break;
            }
        },
        onMouseOver() {
            if (!this.isHovered) this.isHovered = true;
        },
        onMouseOut() {
            if (!this.isContextualMenuActive) this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tree-designer-item {
        position: relative;
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        grid-column: 1 / 3;
        border: 1px solid $GREY;
        padding: 0 12px 0 10px;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        cursor: grab;

        &--menu-active {
            z-index: $Z_INDEX_LVL_3;
        }

        &:hover {
            z-index: $Z_INDEX_LVL_2;
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__icon {
            margin-right: 8px;
            cursor: pointer;
        }

        &__contextual-menu {
            flex: 0 1 auto;
            align-items: flex-start;
            opacity: 0;

            &--hovered {
                opacity: 1;
            }
        }

        &:not(&--first-column) {
            &::before {
                position: absolute;
                left: -8px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: $GREEN;
                content: "";
            }
        }
    }
</style>
