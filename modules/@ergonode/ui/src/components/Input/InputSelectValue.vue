/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot name="value">
            <span v-text="value" />
        </slot>
    </div>
</template>

<script>
import {
    ALIGNMENT,
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'InputSelectValue',
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                Object,
                String,
                Number,
            ],
            default: '',
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Alignment of selected value, might be centered or from left
         */
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        /**
         * Wrapping selected values
         */
        wrap: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'input-select-value',
                `input-select-value--${this.size}`,
                `input-select-value--${this.alignment}`,
                {
                    'input-select-value--disabled': this.disabled,
                    'input-select-value--wrap': this.wrap,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-select-value {
        display: flex;
        align-self: center;
        align-items: center;
        width: 100%;
        padding: 0 4px;
        box-sizing: border-box;
        color: $GRAPHITE_DARK;

        &:not(&--wrap) > span {
            flex: 1 1 auto;
            width: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &--left {
            justify-content: flex-start;
        }

        &--center {
            justify-content: center;
        }

        &--small {
            font: $FONT_MEDIUM_12_16;
        }

        &--regular {
            font: $FONT_MEDIUM_14_20;
        }

        &--disabled {
            color: $GRAPHITE;
        }
    }
</style>
