/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label
        :class="classes"
        v-text="label" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'InputLabel',
    props: {
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
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * The floating state, absolute position relative to parent
         * @values top, left, bottom, right
         */
        floating: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines state of focused component
         */
        focused: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component has error
         */
        error: {
            type: Boolean,
            default: false,
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
    },
    computed: {
        classes() {
            return [
                'input-label',
                `input-label--${this.size}`,
                {
                    'input-label--floating': this.floating,
                    'input-label--focused': this.focused,
                    'input-label--required': this.required,
                    'input-label--error': this.error,
                    'input-label--disabled': this.disabled,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-label {
        position: absolute;
        z-index: $Z_INDEX_LVL_2;
        padding: 0 4px;
        margin: 0 1px;
        background-color: $WHITE;
        transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        transform-origin: left;
        color: $GRAPHITE_LIGHT;
        cursor: text;
        will-change:
            transform,
            color;

        &--small {
            top: 8px;
            font: $FONT_MEDIUM_12_16;
        }

        &--regular {
            top: 10px;
            font: $FONT_MEDIUM_14_20;
        }

        &--floating {
            transform: translateY(-100%) scale(0.8);

            &.input-label--disabled {
                background-image: linear-gradient($WHITE, $WHITESMOKE);
            }
        }

        &--focused {
            color: $GREEN;
        }

        &--disabled {
            background-color: $WHITESMOKE;
            cursor: not-allowed;
        }

        &--error {
            color: $RED;
        }

        &--required::after {
            color: $RED;
            content: "*";
        }
    }
</style>
