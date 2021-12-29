/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div
            class="input-solid-style__input"
            ref="input"
            :style="inputStyle"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <fieldset
                v-if="border"
                class="input-solid-style__border" />
            <slot
                name="activator"
                :input-reference="$refs.input" />
        </div>
        <slot />
        <slot name="details">
            <span
                v-if="detailsLabel"
                class="input-solid-style__details-label"
                v-text="detailsLabel" />
        </slot>
    </div>
</template>

<script>
import {
    ALIGNMENT,
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'InputSolidStyle',
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
         * Height of the component
         */
        height: {
            type: String,
            default: '',
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
         * Determines state of focused component
         */
        focused: {
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
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component has border
         */
        border: {
            type: Boolean,
            default: true,
        },
        /**
         * Additional label which gives user hint about component above
         */
        detailsLabel: {
            type: String,
            default: '',
        },
    },
    computed: {
        inputStyle() {
            if (this.height) {
                return {
                    flex: `0 0 ${this.height}`,
                    height: this.height,
                };
            }

            return {
                flex: 1,
            };
        },
        classes() {
            return [
                'input-solid-style',
                `input-solid-style--${this.size}`,
                {
                    'input-solid-style--focused': this.focused,
                    'input-solid-style--error': this.error,
                    'input-solid-style--disabled': this.disabled,
                },
            ];
        },
    },
    methods: {
        onMouseDown(event) {
            this.$emit('mousedown', event);
        },
        onMouseUp(event) {
            this.$emit('mouseup', event);
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-solid-style {
        $solid: &;

        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        box-sizing: border-box;

        &__input {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
        }

        &__border {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border: $BORDER_1_GREY;
            box-sizing: border-box;
            background-color: $WHITE;
            transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            will-change: border-color;

            &::after {
                position: absolute;
                top: -1px;
                left: -1px;
                bottom: -1px;
                right: -1px;
                z-index: $Z_INDEX_LVL_1;
                border: $BORDER_2_GREEN;
                opacity: 0;
                will-change: opacity;
                content: "";
            }
        }

        &__details-label {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            margin-top: 4px;
            word-break: break-word;
        }

        &--small {
            #{$solid}__input {
                padding: 4px;
            }

            #{$solid}__details-label {
                margin-left: 8px;
                margin-right: 8px;
            }
        }

        &--regular {
            #{$solid}__input {
                padding: 8px;
            }

            #{$solid}__details-label {
                margin-left: 12px;
                margin-right: 12px;
            }
        }

        &:not(&--error):not(&--focused):hover {
            #{$solid}__border {
                border-color: $GREY_DARK;
            }
        }

        &--focused {
            #{$solid}__border::after {
                opacity: 1;
            }
        }

        &--error {
            #{$solid}__border::after {
                border-color: $RED;
                opacity: 1;
            }

            #{$solid}__details-label {
                color: $RED;
            }
        }

        &--disabled {
            cursor: not-allowed;

            #{$solid}__border {
                background-color: $WHITESMOKE;
            }

            #{$solid}__details-label {
                color: $GRAPHITE;
            }
        }
    }
</style>
