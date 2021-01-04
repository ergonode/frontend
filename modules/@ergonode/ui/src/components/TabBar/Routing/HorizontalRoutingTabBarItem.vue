/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        tabindex="-1"
        @click="onLinkSelect">
        {{ item.title }}
        <IconError
            v-if="hasError"
            view-box="6 -6 12 36"
            :fill-color="redColor" />
        <IconMark
            v-else-if="hasSuccess"
            :fill-color="greenColor" />
        <IconSync
            v-else-if="hasValueToSave"
            :fill-color="graphiteDarkColor" />
    </div>
</template>

<script>
import {
    GRAPHITE_DARK,
    GREEN,
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconError from '@UI/components/Icons/Feedback/IconError';
import IconMark from '@UI/components/Icons/Feedback/IconMark';
import IconSync from '@UI/components/Icons/Feedback/IconSync';

export default {
    name: 'HorizontalRoutingTabBarItem',
    components: {
        IconError,
        IconSync,
        IconMark,
    },
    props: {
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Selected index of tab
         */
        selectedIndex: {
            type: Number,
            required: true,
        },
        /**
         * Item data model
         */
        item: {
            type: Object,
            required: true,
        },
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        classes() {
            return [
                'tab-bar-item',
                {
                    'tab-bar-item--error': this.hasError,
                },
            ];
        },
        redColor() {
            return RED;
        },
        greenColor() {
            return GREEN;
        },
        graphiteDarkColor() {
            return GRAPHITE_DARK;
        },
        changeValuesKeys() {
            return Object.keys(this.changeValues);
        },
        hasValueToSave() {
            return this.changeValuesKeys.length > 0 && !this.changeValues.saved;
        },
        hasError() {
            return Object.keys(this.errors).length > 0;
        },
        hasSuccess() {
            return this.changeValues.saved;
        },
    },
    methods: {
        onLinkSelect() {
            if (this.item.route.name !== this.$route.name) {
                this.$emit('select', this.index);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item {
        outline: none;
        display: flex;
        flex: 0 0 176px;
        justify-content: center;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
        padding-top: 6px;
        word-break: break-all;
        text-overflow: ellipsis;
        cursor: pointer;
        overflow: hidden;

        &--error {
            color: $RED;
        }
    }
</style>
