/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="classes"
        @click="onClick">
        <Component
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
                },
            ];
        },
        tabIconComponent() {
            return this.item.iconComponent || null;
        },
        tabIconFillColor() {
            if (!this.item.iconComponent) {
                return null;
            }

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

        &__title {
            margin-top: 4px;
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
