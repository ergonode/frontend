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
                    :value="value"
                    :disabled="disabled"
                    :checked="value"
                    type="checkbox"
                    @input="onValueChange">
                <label :for="uuid">
                    <div class="toggler__state-background">
                        <div class="toggler__state" />
                    </div>
                    <span
                        v-if="label"
                        class="toggler__label"
                        v-text="label" />
                </label>
                <slot name="append" />
            </div>
        </template>
    </InputUUIDProvider>
</template>

<script>

/**
 * `Toggler` is a default component to determinate true / false action.
 */
export default {
    name: 'Toggler',
    props: {
        /**
         * Component value
         */
        value: {
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
        classes() {
            return [
                'toggler',
                {
                    'toggler--reversed': this.reversed,
                },
            ];
        },
    },
    methods: {
        onValueChange(event) {
            event.preventDefault();

            this.$emit('input', !this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .toggler {
        $toggler: &;

        position: relative;
        display: grid;
        grid-template-columns: max-content;
        grid-auto-flow: column;
        column-gap: 8px;
        align-items: center;

        & label {
            position: relative;
            display: flex;
            align-items: center;
        }

        &__state-background {
            display: flex;
            align-items: center;
            width: 30px;
            height: 12px;
            background-color: $GREY_LIGHT;
            border-radius: 8px;
            box-shadow: $ELEVATOR_HOLE;
        }

        &__state {
            position: relative;
            z-index: $Z_INDEX_LVL_1;
            display: flex;
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background-color: $WHITE;
            box-shadow: $ELEVATOR_2_DP;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

            &::after {
                position: absolute;
                top: 5px;
                left: 4px;
                width: 6px;
                height: 3px;
                border-left: 2px solid $WHITE;
                border-bottom: 2px solid $WHITE;
                transform: rotate(-45deg);
                opacity: 0;
                content: "";
            }
        }

        &__label {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            margin-left: 8px;
        }

        &--reversed {
            & input[type="checkbox"] {
                right: 0;
            }

            & label {
                flex-direction: row-reverse;
            }

            #{$toggler}__label {
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
            opacity: 0;

            &:focus + label, &:not(:disabled):hover + label {
                #{$toggler}__state {
                    box-shadow: $ELEVATOR_HOVER_FOCUS;
                }
            }

            &:not(:disabled) + label {
                cursor: pointer;
            }

            &:disabled + label {
                cursor: not-allowed;
            }

            &:checked + label {
                #{$toggler}__state {
                    transform: translateX(15px);
                    background-color: $GREEN;

                    &::after {
                        opacity: 1;
                    }
                }
            }

            &:checked:disabled + label {
                #{$toggler}__state {
                    transform: translateX(15px);
                    background-color: $GREY_LIGHT;

                    &::after {
                        opacity: 1;
                        border-color: $GREY_DARK;
                    }
                }
            }

            &:not(:checked):disabled + label {
                #{$toggler}__state {
                    background-color: $GREY_LIGHT;
                }
            }
        }
    }
</style>
