/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="classes"
        type="button"
        :aria-label="item.title"
        @click="onClick">
        <Component
            v-if="isIcon"
            :is="tabIconComponent"
            :fill-color="tabIconFillColor" />
        <span
            class="tab-bar-item__title"
            v-text="item.title" />
    </button>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'VerticalTabBarItem',
    props: {
        index: {
            type: Number,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'tab-bar-item',
                {
                    'tab-bar-item--selected': this.isSelected,
                    'tab-bar-item--icon': this.isIcon,
                },
            ];
        },
        isIcon() {
            return Boolean(this.item.icon);
        },
        tabIconComponent() {
            return this.item.icon;
        },
        tabIconFillColor() {
            return this.isSelected
                ? GREEN
                : GRAPHITE;
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
        $tabItem: &;

        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80px;
        border: none;
        padding: 12px 8px;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        color: $GRAPHITE;
        font: $FONT_MEDIUM_12_16;
        outline: none;
        text-align: center;
        cursor: pointer;

        &--icon &__title {
            margin-top: 4px;
        }

        &--icon {
            min-height: 68px;
        }

        &--selected {
            background-image: linear-gradient(to left, $WHITE, $WHITESMOKE);

            #{$tabItem}__title {
                opacity: 0.9;
                color: $GRAPHITE_DARK;
            }
        }
    }
</style>
