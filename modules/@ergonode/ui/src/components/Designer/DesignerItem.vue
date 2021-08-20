/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        :class="classes"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot name="body">
            <slot name="prepend" />
            <slot name="description">
                <DesignerItemDescription
                    :title="title"
                    :subtitle="subtitle" />
            </slot>
            <slot name="append" />
        </slot>
        <ActionIconButton
            v-if="!disabled && menuItems.length"
            :class="menuItemsClasses"
            :theme="secondaryTheme"
            :size="tinySize"
            :floating="menuPosition"
            :options="menuItems"
            @input="onSelectValue"
            @focus="onSelectFocus">
            <template #icon="{ color }">
                <IconDots :fill-color="color" />
            </template>
        </ActionIconButton>
    </div>
</template>
<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import DesignerItemDescription from '@UI/components/Designer/DesignerItemDescription';
import {
    GRID_GAP,
} from '@UI/defaults/designer';

export default {
    name: 'DesignerItem',
    components: {
        DesignerItemDescription,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: '',
        },
        row: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        },
        gap: {
            type: Number,
            default: GRID_GAP,
        },
        /**
         * Determines edit mode state
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        menuPosition: {
            type: Object,
            default: null,
        },
        menuItems: {
            type: Array,
            default: () => [],
        },
        width: {
            type: Number,
            default: 2,
        },
        height: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        styles() {
            const gridRow = this.row + 1;
            const gridColumn = this.column + 1;

            return {
                gridArea: `${gridRow} / ${gridColumn} / ${gridRow + this.height} / ${gridColumn + this.width}`,
                margin: `${this.gap}px`,
            };
        },
        classes() {
            return [
                'designer-item',
                {
                    'designer-item--first-column': this.column === 0,
                },
            ];
        },
        menuItemsClasses() {
            return [
                'designer-item__menu',
                {
                    'designer-item__menu--hovered': this.isHovered,
                },
            ];
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isMenuActive = isFocused;
        },
        onSelectValue(option) {
            this.$emit('select-menu-option', option);
        },
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            if (!this.isMenuActive) this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-item {
        position: relative;
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        align-items: center;
        grid-column-gap: 8px;
        border: $BORDER_1_GREY;
        padding: 0 12px;
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

        &__menu {
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
