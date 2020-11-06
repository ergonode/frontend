/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :size="smallSize"
        :theme="theme"
        :title="title"
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
import NumericBadge from '@UI/components/Badges/NumericBadge';
import Button from '@UI/components/Button/Button';
import IconArrowDouble from '@UI/components/Icons/Arrows/IconArrowDouble';

export default {
    name: 'ExpandNumericButton',
    components: {
        Button,
        NumericBadge,
        IconArrowDouble,
    },
    props: {
        /**
         * Determines state of expanded component
         */
        isExpanded: {
            type: Boolean,
            default: false,
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
        smallSize() {
            return SIZE.SMALL;
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
