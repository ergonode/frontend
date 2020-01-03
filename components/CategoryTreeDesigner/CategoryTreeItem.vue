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
            size="20"
            :state="btnExpanderIconState"
            @click.native="toggleItemExpand" />
        <span class="grid-item__title font--medium-14-20">
            {{ itemName }}
        </span>
        <NumericBadge
            v-if="hasChildren"
            :number="numberOfChildren"
            theme="transparent" />
        <div
            :class="['grid-item__contextual-menu', contextualMenuHoveStateClasses]">
            <MenuButton
                :theme="secondaryTheme"
                :size="smallSize"
                :plain="true"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus">
                <template #icon="{ fillColor }">
                    <IconDots :fill-color="fillColor" />
                </template>
            </MenuButton>
        </div>
    </div>
</template>
<script>
import { SIZES, THEMES } from '~/defaults/buttons';
import { ACTION } from '~/defaults/icons';
import IconDots from '~/components/Icon/Others/IconDots';
import IconPlusMinus from '~/components/Icon/Actions/IconPlusMinus';
import MenuButton from '~/core/components/Buttons/MenuButton';
import NumericBadge from '~/core/components/Badges/NumericBadge';

export default {
    name: 'CategoryTreeItem',
    components: {
        IconDots,
        IconPlusMinus,
        MenuButton,
        NumericBadge,
    },
    data() {
        return {
            isContextualMenuActive: false,
            contextualMenuItems: ['Remove'],
            isHovered: false,
        };
    },
    props: {
        isExpanded: {
            type: Boolean,
            default: false,
        },
        itemName: {
            type: String,
            required: true,
        },
        numberOfChildren: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        hasChildren() {
            return this.numberOfChildren > 0;
        },
        btnExpanderIconState() {
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
        onSelectValue(value) {
            switch (value) {
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
        cursor: move;
        overflow: hidden;

        &--menu-active {
            z-index: $Z_INDEX_LVL_3;
        }

        &:hover {
            z-index: $Z_INDEX_LVL_2;
            border: none;
            box-shadow: $ELEVATOR_6_DP;
        }

        &__icon {
            margin-right: 8px;
            flex: 0 0 auto;
            cursor: pointer;
        }

        &__title {
            flex: 1;
            margin-right: 8px;
            color: $GRAPHITE_DARK;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
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
