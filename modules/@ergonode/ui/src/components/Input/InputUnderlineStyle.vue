/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div
            class="input-underline-style__input"
            ref="input"
            :style="inputStyle"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot
                name="activator"
                :input-reference="$refs.input" />
        </div>
        <slot />
        <slot name="details">
            <span
                v-if="detailsLabel"
                class="input-underline-style__details-label"
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
    name: 'InputUnderlineStyle',
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
            default: 'unset',
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
                'input-underline-style',
                `input-underline-style--${this.size}`,
                `input-underline-style--${this.alignment}`,
                {
                    'input-underline-style--focused': this.focused,
                    'input-underline-style--error': this.error,
                    'input-underline-style--disabled': this.disabled,
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
    .input-underline-style {
        $underline: &;

        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        background-color: $WHITE;

        &__input {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;

            &::before, &::after {
                position: absolute;
                left: 0;
                z-index: $Z_INDEX_LVL_3;
                transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                will-change: transform;
                content: "";
            }

            &::before {
                bottom: 0;
                width: 100%;
                border: solid $GREY;
                border-width: thin 0 0;
            }

            &::after {
                transform: scaleX(0);
            }
        }

        &:not(&--error):not(&--focused):hover {
            #{$underline}__input::before {
                border-color: $GREY_DARK;
            }
        }

        &__details-label {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            margin-top: 4px;
            word-break: break-word;
        }

        &--left {
            #{$underline}__input::after {
                bottom: 0;
                width: 100%;
                height: 2px;
                background-color: $GREEN;
                transform-origin: left;
            }
        }

        &--center {
            #{$underline}__input::after {
                bottom: -1px;
                width: 100%;
                border: solid $GREEN;
                border-width: thin 0;
            }
        }

        &--focused {
            #{$underline}__input::after {
                transform: scaleX(1);
            }
        }

        &--error {
            #{$underline}__input::after {
                background-color: $RED;
                border-color: $RED;
            }

            #{$underline}__details-label {
                color: $RED;
            }
        }

        &--disabled {
            cursor: not-allowed;

            #{$underline}__details-label {
                color: $GRAPHITE;
            }
        }
    }
</style>
