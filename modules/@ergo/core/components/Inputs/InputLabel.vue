/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label
        :class="labelClasses"
        v-text="label" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'InputLabel',
    props: {
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        required: {
            type: Boolean,
            default: false,
        },
        floating: {
            type: Boolean,
            default: false,
        },
        focused: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
    },
    computed: {
        labelClasses() {
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
        padding: 0 2px;
        margin: 0 -2px;
        background-color: $WHITE;
        transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        transform-origin: left;
        color: $GRAPHITE_LIGHT;
        cursor: text;
        will-change:
            transform,
            color;

        &--small {
            font: $FONT_MEDIUM_12_16;
        }

        &--regular {
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
            color: $GREY_DARK;
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
