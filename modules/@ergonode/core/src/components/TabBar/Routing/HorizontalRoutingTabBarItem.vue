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
        <IconSync
            v-else-if="hasValueToSave"
            :fill-color="graphiteDarkColor" />
        <IconMark
            v-else-if="changeValues.saved"
            :fill-color="greenColor" />
    </div>
</template>

<script>
import {
    GRAPHITE_DARK,
    GREEN,
    RED,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconError from '@Core/components/Icons/Feedback/IconError';
import IconMark from '@Core/components/Icons/Feedback/IconMark';
import IconSync from '@Core/components/Icons/Feedback/IconSync';

export default {
    name: 'HorizontalRoutingTabBarItem',
    components: {
        IconError,
        IconSync,
        IconMark,
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
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
        hasValueToSave() {
            return Object.keys(this.changeValues).length > 0 && !this.changeValues.saved;
        },
        hasError() {
            return Object.keys(this.errors).length > 0;
        },
    },
    methods: {
        onLinkSelect() {
            this.$router.push({
                name: this.item.route.name,
            });

            this.$emit('select', this.index);
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
