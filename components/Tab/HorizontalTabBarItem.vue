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
                left-alignment
                autofocus
                @focus="onFocusLost" />
        </template>
        <template v-else>
            <NuxtLink
                :to="item.path"
                :class="[
                    'tab-bar-item__button',
                    'typo-subtitle',
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
                <ButtonSelect
                    icon-path="Others/IconDots"
                    :options="options"
                    @input="onSelectValue"
                    @focus="onMenuActive" />
            </div>
        </template>
    </div>
</template>

<script>
import tabBarItemMixin from '~/mixins/tabBar/tabBarItemMixin';

export default {
    name: 'HorizontalTabContent',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
        ButtonSelect: () => import('~/components/Inputs/Select/ButtonSelect'),
    },
    mixins: [tabBarItemMixin],
    data() {
        return {
            options: ['Edit name', 'Clone tab', 'Remove'],
            menuActive: false,
            editableMode: false,
        };
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
        background-color: $white;
        cursor: pointer;
        border-top: 1px solid $grey;

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
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, $white 100%);
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
            border-bottom: 1px solid $grey;
        }

        &:nth-child(even), &:nth-child(odd), &:first-child {
            border-left: 1px solid  $grey;
        }

        &:last-child {
            border-right: 1px solid  $grey;
        }

        &--disabled {
            background-color: $background;
            cursor: default;
            border-color: $grey;
            pointer-events: none;

            #{$item}__button {
                color: $lightGraphite;
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
            background-color: $primary;
            opacity: 0;
            content: "";
        }

        &--selected:after {
            opacity: 1;
        }
    }
</style>
