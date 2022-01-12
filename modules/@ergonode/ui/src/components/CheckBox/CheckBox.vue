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
                    ref="checkbox"
                    type="checkbox"
                    :value="label"
                    :disabled="disabled"
                    v-model="checkValue">
                <label :for="uuid">
                    <svg
                        class="checkbox__box"
                        viewBox="0 0 14 10">
                        <path
                            class="checkbox__mark"
                            :d="markDrawingCommands" />
                    </svg>
                    <span
                        v-if="label"
                        class="checkbox__label"
                        v-text="label" />
                </label>
                <slot name="append" />
            </div>
        </template>
    </InputUUIDProvider>
</template>

<script>

export default {
    name: 'CheckBox',
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                Array,
                Boolean,
                Number,
            ],
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
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
        /**
         * Determinate if the component content is reversed
         */
        reversed: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        checkValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
        classes() {
            return [
                'checkbox',
                {
                    'checkbox--reversed': this.reversed,
                },
            ];
        },
        markDrawingCommands() {
            if (this.value === 2) {
                return 'M2,5 h10';
            }

            return 'M5.22179 9.44443L0.777344 5.17093L2.02179 3.97435L5.22179 7.05127L11.9773 0.555542L13.2218 1.75212L5.22179 9.44443Z';
        },
    },
    watch: {
        value() {
            this.setIndeterminateState();
        },
    },
    mounted() {
        this.setIndeterminateState();
    },
    methods: {
        setIndeterminateState() {
            this.$refs.checkbox.indeterminate = this.value === 2;
        },
    },
};
</script>

<style lang="scss" scoped>
    .checkbox {
        $checkbox: &;

        position: relative;
        display: grid;
        grid-template-columns: max-content;
        grid-auto-flow: column;
        column-gap: 4px;
        align-items: center;

        & label {
            position: relative;
            display: flex;
            align-items: center;

            &::after {
                position: absolute;
                left: 4px;
                width: 16px;
                height: 16px;
                box-shadow: $ELEVATOR_HOVER_FOCUS;
                opacity: 0;
                content: "";
            }
        }

        &__label {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            margin-left: 8px;
        }

        &__box {
            position: relative;
            display: flex;
            width: 16px;
            height: 16px;
            border: $BORDER_1_GREY;
            margin: 4px;
            box-sizing: border-box;
            background-color: $WHITE;
        }

        &__mark {
            fill: none;
        }

        &--reversed {
            & input[type="checkbox"] {
                right: 0;
            }

            & label {
                flex-direction: row-reverse;

                &::after {
                    left: unset;
                    right: 4px;
                }
            }

            #{$checkbox}__label {
                margin-right: 8px;
            }
        }

        &:not(&--reversed) {
            & input[type="checkbox"] {
                left: 0;
            }
        }

        & input[type="checkbox"] {
            position: absolute;
            top: 0;
            margin: 0;
            opacity: 0;

            &:not(:disabled):focus + label::after,
            &:not(:disabled):hover + label::after {
                opacity: 1;
            }

            &:not(:disabled) {
                & + label {
                    cursor: pointer;
                }

                &:checked + label, &:indeterminate + label {
                    #{$checkbox}__box {
                        background-color: $GREEN;
                        border-color: $GREEN;
                    }

                    #{$checkbox}__mark {
                        fill: $WHITE;
                    }
                }

                &:indeterminate + label {
                    #{$checkbox}__mark {
                        stroke: $WHITE;
                    }
                }
            }

            &:indeterminate + label {
                #{$checkbox}__mark {
                    stroke-width: 2px;
                }
            }

            &:disabled {
                & + label {
                    cursor: not-allowed;

                    #{$checkbox}__box {
                        background-color: $GREY_LIGHT;
                    }
                }

                &:checked + label {
                    #{$checkbox}__mark {
                        fill: $GREY_DARK;
                    }
                }

                &:indeterminate + label {
                    #{$checkbox}__mark {
                        stroke: $GREY_DARK;
                    }
                }
            }
        }
    }
</style>
