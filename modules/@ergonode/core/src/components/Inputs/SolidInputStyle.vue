/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div class="solid-input-style__input">
            <fieldset>
                <legend :style="{ width: `${labelWidth}px` }" />
            </fieldset>
            <slot name="activator" />
        </div>
        <div
            class="solid-input-style__details"
            v-if="hasDetailsSlot">
            <slot name="details" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SolidInputStyle',
    props: {
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
        labelWidth: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        hasDetailsSlot() {
            return !!this.$slots.details;
        },
        classes() {
            return [
                'solid-input-style',
                {
                    'solid-input-style--focused': this.focused,
                    'solid-input-style--error': this.error,
                    'solid-input-style--disabled': this.disabled,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .solid-input-style {
        $solid: &;

        position: relative;
        display: flex;
        flex-direction: column;

        fieldset {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border: $BORDER_1_GREY;
            box-sizing: border-box;

            legend {
                background-color: $WHITE;
                color: $GRAPHITE_LIGHT;
                font: $FONT_MEDIUM_12_16;
            }
        }

        &__details {
            padding: 4px 8px 0;
        }

        &:hover {
            border-color: $GREY_DARK;
        }

        &--focused {
            #{$solid}__input {
                box-shadow: inset 0 0 0 2px $GREEN;
            }

            fieldset {
                border-color: $GREEN;
            }
        }

        &--error {
            fieldset {
                border-color: $RED;
            }

            fieldset ~ * {
                box-shadow: inset 0 0 0 1px $RED;
            }
        }

        &--disabled {
            pointer-events: none;
            cursor: not-allowed;

            fieldset {
                background-color: $WHITESMOKE;
            }
        }
    }
</style>
