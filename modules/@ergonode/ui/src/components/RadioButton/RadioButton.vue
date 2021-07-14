/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <InputUUIDProvider>
        <template #default="{ uuid }">
            <div :class="classes">
                <input
                    :id="uuid"
                    v-model="radioValue"
                    type="radio"
                    :value="label"
                    :name="name">
                <label :for="uuid">
                    <div class="radio-button__content">
                        <div
                            v-show="isSelected"
                            class="radio-button__mark" />
                    </div>
                    <span
                        v-if="label"
                        class="radio-button__label"
                        v-text="label" />
                </label>
                <slot name="append" />
            </div>
        </template>
    </InputUUIDProvider>
</template>

<script>
import InputUUIDProvider from '@UI/components/Input/InputUUIDProvider';

export default {
    name: 'RadioButton',
    components: {
        InputUUIDProvider,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                String,
                Boolean,
            ],
            default: '',
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
        /**
         * Used as name attribute
         */
        name: {
            type: String,
            default: '',
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isSelected() {
            if (typeof this.value === 'boolean') {
                return this.value;
            }

            return this.value === this.label;
        },
        radioValue: {
            get() {
                return this.value;
            },
            set() {
                this.$emit('input', typeof this.value === 'boolean' ? !this.value : this.label);
            },
        },
        classes() {
            return [
                'radio-button',
                {
                    'radio-button--disabled': this.disabled,
                    'radio-button--selected': this.isSelected,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .radio-button {
        $radio: &;

        position: relative;
        display: grid;
        grid-template-columns: max-content;
        grid-auto-flow: column;
        column-gap: 4px;
        align-items: center;

        & input[type="radio"] {
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            opacity: 0;

            &:focus + label {
                #{$radio}__content {
                    box-shadow: $ELEVATOR_HOVER_FOCUS;
                }
            }
        }

        & label {
            position: relative;
            display: grid;
            grid-auto-flow: column;
            column-gap: 8px;
            align-items: center;
            cursor: pointer;
        }

        &__content {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border: $BORDER_1_GREY;
            margin: 4px;
            box-sizing: border-box;
            cursor: pointer;
        }

        &__content, &__mark {
            border-radius: 50%;
        }

        &__mark {
            flex-basis: 10px;
            height: 10px;
            background-color: $GREEN;
        }

        &__label {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            cursor: pointer;
        }

        &--selected {
            &:not(#{$radio}--disabled) {
                #{$radio}__content {
                    border: $BORDER_2_GREEN;
                }
            }
        }

        &--disabled {
            pointer-events: none;

            #{$radio}__content {
                background-color: $GREY_LIGHT;
            }

            #{$radio}__mark {
                background-color: $GREY_DARK;
            }
        }
    }
</style>
