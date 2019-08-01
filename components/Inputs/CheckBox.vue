/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div :class="['checkbox', checkboxStateClasses]">
        <input
            id="checkbox_1"
            type="checkbox"
            @input="onValueChange">
        <label
            for="checkbox_1" />
    </div>
</template>

<script>

export default {
    name: 'CheckBox',
    props: {
        value: {
            type: [Boolean, Number],
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        checkboxStateClasses() {
            return [
                {
                    'checkbox--disabled': this.disabled,
                    'checkbox--checked': this.value,
                    'checkbox--checked-any': Number.isInteger(this.value) && this.value === 2,
                },
            ];
        },
    },
    methods: {
        onValueChange() {
            if (Number.isInteger(this.value)) {
                if (this.value === 2) {
                    this.$emit('input', 0);
                } else {
                    this.$emit('input', this.value === 0 ? this.value + 1 : this.value - 1);
                }
            } else {
                this.$emit('input', !this.value);
            }
        },
    },
};
</script>


<style lang="scss" scoped>
    .checkbox {
        $checkbox: &;

        position: relative;

        & input[type="checkbox"] {
            position: absolute;
            opacity: 0;
        }

        & label {
            position: relative;
            padding-left: 22px;

            &::before, &::after {
                position: absolute;
                content: "";
            }

            &::before {
                top: 0;
                left: 0;
                width: 16px;
                height: 16px;
                border: 1px solid $grey;
                box-sizing: border-box;
                border-radius: 2px;
            }
        }

        &--checked {
            label::after {
                top: 4px;
                left: 3px;
                width: 8px;
                height: 4px;
                border-left: 2px solid $white;
                border-bottom: 2px solid $white;
                transform: rotate(-45deg);
                opacity: 0;
            }
        }

        &--checked-any {
            label::after {
                top: 4px;
                left: 4px;
                width: 10px;
                height: 1px;
                background-color: $white;
                opacity: 0;
            }
        }

        &--disabled {
            pointer-events: none;
        }

        &--checked, &--checked-any {
            & label {
                &::before {
                    border-color: $success;
                    background-color: $success;
                }

                &::after {
                    opacity: 1;
                }
            }
        }
    }
</style>
