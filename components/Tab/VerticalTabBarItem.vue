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
                    'tab-bar-item--selected': (isSelected && isContentExpanded),
                    'tab-bar-item--disabled': !item.active,
                    'nonIcon': !Boolean(item.icon),
                    'not-expanded-content': !isContentExpanded,
                }
            ]"
        :disabled="!item.active"
        @click="onClick">
        <Icon
            :icon="tabIcon"
            size="medium" />
        <span
            class="tab-bar-item__title"
            v-text="item.title" />
    </div>
</template>

<script>
import tabBarItemMixin from '~/mixins/tabBar/tabBarItemMixin';

export default {
    name: 'VerticalTabBarItem',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    mixins: [tabBarItemMixin],
    computed: {
        tabIcon() {
            if (!this.item.icon) {
                return null;
            }

            return this.item.active && this.isContentExpanded
                ? `${this.item.icon}--selected`
                : `${this.item.icon}--deactive`;
        },
    },
    methods: {
        onClick() {
            this.$emit('select', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item {
        @include setFont(medium, small, regular, $graphite);
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8px;
        background-color: $white;
        outline: none;
        border-left: 1px solid $grey;
        border-top: 1px solid $grey;

        &__title {
            text-align: center;
        }

        &:not(&--selected), &.not-expanded-content {
            border-right: 1px solid $grey;
            padding-right: 7px;
        }

        &:last-child {
            border-bottom: 1px solid $grey;
        }

        &.nonIcon {
            min-height: 56px;
        }

        &--disabled {
            color: $grey;
            border-color: $grey;
        }

        &:after {
            position: absolute;
            top: 0;
            left: -1px;
            z-index: 1;
            width: 3px;
            height: 100%;
            background-color: $success;
            opacity: 0;
            content: "";
        }

        &--selected:after {
            opacity: 1;
        }
    }
</style>
