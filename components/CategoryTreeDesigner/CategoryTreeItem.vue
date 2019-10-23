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
        <span class="grid-item__title txt-fixed typo-subtitle txt--dark-graphite">
            {{ itemName }}
        </span>
        <span
            v-if="hasChildren"
            class="grid-item__categories-length txt-fixed typo-hint txt--dark-graphite">
            {{ numberOfChildren }}
        </span>
        <div
            :class="['grid-item__contextual-menu', contextualMenuHoveStateClasses]">
            <ButtonSelect
                icon-path="Others/IconDots"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus" />
        </div>
    </div>
</template>
<script>
import { Action } from '~/model/icons/Action';
import IconPlusMinus from '~/components/Icon/Actions/IconPlusMinus';
import ButtonSelect from '~/components/Inputs/Select/ButtonSelect';

export default {
    name: 'CategoryTreeItem',
    components: {
        IconPlusMinus,
        ButtonSelect,
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
        hasChildren() {
            return this.numberOfChildren > 0;
        },
        btnExpanderIconState() {
            return this.isExpanded
                ? Action.PLUS
                : Action.MINUS;
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

        z-index: 5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        grid-column: 1 / 4;
        height: 100%;
        border: 1px solid $GREY;
        padding-left: 12px;
        background-color: $WHITESMOKE;
        cursor: move;
        overflow: hidden;

        &--menu-active {
            z-index: 15;
        }

        &:hover {
            z-index: 10;
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
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &__categories-length {
            flex: 0 1 auto;
            border: 1px solid $GREY;
            padding: 2px 8px;
            border-radius: 12px;
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
