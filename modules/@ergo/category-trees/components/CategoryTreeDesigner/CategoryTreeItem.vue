/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['grid-item',{ 'grid-item--menu-active': isContextualMenuActive }]"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut">
        <IconPlusMinus
            v-if="hasChildren"
            class="grid-item__icon"
            :state="buttonExpanderIconState"
            @click.native="toggleItemExpand" />
        <div
            class="grid-item__title"
            :title="item.name ? `#${item.code}`: ''">
            <span
                class="grid-item__name"
                v-text="item.name || `#${item.code}`" />
            <span
                v-if="item.name"
                class="grid-item__code"
                v-text="`#${item.code}`" />
        </div>
        <NumericBadge
            class="grid-item__categories-length"
            v-if="hasChildren"
            :number="numberOfChildren"
            :theme="secondaryTheme" />
        <div
            :class="['grid-item__contextual-menu', contextualMenuHoveStateClasses]">
            <ActionIconButton
                :theme="secondaryTheme"
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
import { SIZE, THEME } from '@Core/defaults/theme';
import { ACTION } from '@Core/defaults/icons';
import IconDots from '@Core/components/Icons/Others/IconDots';
import IconPlusMinus from '@Core/components/Icons/Actions/IconPlusMinus';
import ActionIconButton from '@Core/components/Buttons/ActionIconButton';
import NumericBadge from '@Core/components/Badges/NumericBadge';

export default {
    name: 'CategoryTreeItem',
    components: {
        IconDots,
        IconPlusMinus,
        ActionIconButton,
        NumericBadge,
    },
    props: {
        isExpanded: {
            type: Boolean,
            default: false,
        },
        item: {
            type: Object,
            required: true,
        },
        numberOfChildren: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            isContextualMenuActive: false,
            contextualMenuItems: ['Remove'],
            isHovered: false,
        };
    },
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        hasChildren() {
            return this.numberOfChildren > 0;
        },
        buttonExpanderIconState() {
            return this.isExpanded
                ? ACTION.PLUS
                : ACTION.MINUS;
        },
        contextualMenuHoveStateClasses() {
            return { 'grid-item__contextual-menu--hovered': this.isHovered };
        },
    },
    methods: {
        toggleItemExpand() {
            this.$emit('toggleItem');
        },
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(option) {
            switch (option) {
            case 'Remove':
                this.$emit('removeItem');
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
    .grid-item {
        $item: &;

        z-index: $Z_INDEX_LVL_1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        grid-column: 1 / 4;
        height: 100%;
        border: 1px solid $GREY;
        padding-left: 8px;
        background-color: $WHITESMOKE;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        cursor: grab;
        overflow: hidden;

        &--menu-active {
            z-index: $Z_INDEX_LVL_3;
        }

        &:hover {
            z-index: $Z_INDEX_LVL_2;
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__title {
            display: flex;
            flex: 1;
            flex-direction: column;
            margin-right: 8px;
            color: $GRAPHITE_DARK;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &__name {
            font: $FONT_MEDIUM_14_20;
        }

        &__code {
            color: $GRAPHITE;
            font: $FONT_SEMI_BOLD_10_12;
        }

        &__contextual-menu {
            flex: 0 1 auto;
            align-items: flex-start;
            opacity: 0;

            &--hovered {
                opacity: 1;
            }
        }
    }
</style>
