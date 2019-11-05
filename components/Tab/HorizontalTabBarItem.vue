/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="
            [
                'tab-bar-item',
                {
                    'tab-bar-item--selected': isSelected,
                    'tab-bar-item--disabled': !item.active,
                    'nonIcon': Boolean(item.icon),
                }
            ]">
        <template v-if="editableMode">
            <TextField
                small
                left-alignment
                autofocus
                @focus="onFocusLost" />
        </template>
        <template v-else>
            <NuxtLink
                :to="item.route"
                :class="[
                    'tab-bar-item__button',
                    'font--medium-14-20',
                    isSelected ? 'txt--dark-graphite' : 'txt--graphite'
                ]"
                @click.native="onLinkSelect"
                v-text="item.title" />
            <div
                v-if="item.active && isContextualMenu"
                :class="
                    [
                        'tab-bar-item__contextual-menu',
                        {'tab-bar-item__contextual-menu--active': menuActive}
                    ]">
                <MultiButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    :plain="true"
                    :options="options"
                    @input="onSelectValue"
                    @focus="onMenuActive">
                    <template #icon="{ color }">
                        <IconDots :fill-color="color" />
                    </template>
                </MultiButton>
            </div>
        </template>
    </div>
</template>

<script>
import { SIZES, THEMES } from '~/defaults/buttons';
import tabBarItemMixin from '~/mixins/tabBar/tabBarItemMixin';

export default {
    name: 'HorizontalTabBarItem',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
        IconDots: () => import('~/components/Icon/Others/IconDots'),
        MultiButton: () => import('~/components/Buttons/MultiButton'),
    },
    mixins: [tabBarItemMixin],
    data() {
        return {
            options: ['Edit name', 'Clone tab', 'Remove'],
            menuActive: false,
            editableMode: false,
        };
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        onLinkSelect() {
            this.$emit('select', this.index);
        },
        onSelectValue(value) {
            switch (value) {
            case 'Edit name':
                this.editName();
                break;
            case 'Clone tab':
                this.cloneTab();
                break;
            case 'Remove':
                this.remove();
                break;
            default: break;
            }
        },
        onFocusLost(focus) {
            this.editableMode = focus;
            this.menuActive = focus;
        },
        onMenuActive(isActive) {
            this.menuActive = isActive;
        },
        editName() {
            this.editableMode = true;
        },
        cloneTab() {

        },
        remove() {

        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item {
        $item: &;

        position: relative;
        display: flex;
        flex: 0 0 auto;
        width: 165px;
        box-sizing: border-box;
        background-color: $WHITE;
        cursor: pointer;
        border-top: $BORDER_1_GREY;

        &__button, &__input {
            width: 100%;
            text-align: left;
            cursor: pointer;
            outline: none;
        }

        &__button {
            position: relative;
            border: none;
            padding: 8px 12px;
            background-color: transparent;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            text-decoration: none;
        }

        &__button:after {
            position: absolute;
            top: 0;
            right: 0;
            width: 34px;
            height: 100%;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, $WHITE 100%);
            content: "";
        }

        &__contextual-menu {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
            display: flex;
            align-items: center;
            height: 40px;
            margin: 0 auto;

            &:not(&--active) {
                opacity: 0;
            }
        }

        &:hover &__contextual-menu {
            opacity: 1;
            cursor: pointer;
        }

        &:not(&--selected) {
            border-bottom: $BORDER_1_GREY;
        }

        &:nth-child(even), &:nth-child(odd), &:first-child {
            border-left: $BORDER_1_GREY;
        }

        &:last-child {
            border-right: $BORDER_1_GREY;
        }

        &--disabled {
            background-color: $WHITESMOKE;
            cursor: default;
            border-color: $GREY;
            pointer-events: none;

            #{$item}__button {
                color: $GRAPHITE_LIGHT;
            }
        }

        &:after {
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            z-index: 1;
            width: calc(100% + 2px);
            height: 3px;
            background-color: $GREEN;
            opacity: 0;
            content: "";
        }

        &--selected:after {
            opacity: 1;
        }
    }
</style>
