/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :size="size"
        :theme="theme"
        :title="title"
        :floating="floating"
        @click.native="onExpand">
        <template #prepend="{ color }">
            <IconArrowDouble
                :fill-color="color"
                :state="iconExpandedState" />
        </template>
        <template #append>
            <div :class="expandNumberClasses">
                <NumericBadge :number="number" />
            </div>
        </template>
    </Button>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ExpandNumericButton',
    props: {
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.SMALL,
            validator: value => [
                SIZE.TINY,
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            required: true,
        },
        /**
         * Number of elements hidden in panel connected to expanded button
         */
        number: {
            type: Number,
            default: 0,
        },
        /**
         * The floating state, absolute position relative to parent
         * @values top, left, bottom, right
         */
        floating: {
            type: Object,
            default: null,
        },
        /**
         * Determines state of expanded component
         */
        isExpanded: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        expandNumberClasses() {
            return [
                'expand-number',
                {
                    'expand-number--selected': this.isExpanded,
                },
            ];
        },
        theme() {
            return this.isExpanded ? THEME.PRIMARY : THEME.SECONDARY;
        },
        iconExpandedState() {
            return this.isExpanded ? ARROW.UP : ARROW.DOWN;
        },
    },
    methods: {
        onExpand() {
            this.$emit('expand', !this.isExpanded);
        },
    },
};
</script>

<style lang="scss" scoped>
    .expand-number {
        margin: 0 4px;

        &--selected {
            .badge--primary {
                background-color: $GREEN_DARK;
            }
        }
    }
</style>
