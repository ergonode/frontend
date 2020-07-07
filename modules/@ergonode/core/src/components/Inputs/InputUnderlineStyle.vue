/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div
            class="input-underline-style__input"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot name="activator" />
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
    name: 'InputSolidStyle',
    props: {
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        focused: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        detailsLabel: {
            type: String,
            default: '',
        },
    },
    computed: {
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

        &--small {
            #{$underline}__input {
                flex-basis: 32px;
                height: 32px;
            }
        }

        &--regular {
            #{$underline}__input {
                flex-basis: 40px;
                height: 40px;
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
            pointer-events: none;
            cursor: not-allowed;

            #{$underline}__details-label {
                color: $GRAPHITE_LIGHT;
            }
        }
    }
</style>
