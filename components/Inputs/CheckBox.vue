/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div :class="['checkbox', checkboxStateClasses]">
        <input
            :id="associatedLabel"
            type="checkbox"
            @input="onValueChange">
        <label :for="associatedLabel" />
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
    data() {
        return {
            associatedLabel: '',
        };
    },
    mounted() {
        // eslint-disable-next-line no-underscore-dangle
        this.associatedLabel = `checkbox-${this._uid}`;
    },
    computed: {
        checkboxStateClasses() {
            return [
                {
                    'checkbox--disabled': this.disabled,
                    'checkbox--checked': this.value,
                    'checkbox--checked-any': this.value === 2,
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
            visibility: hidden;
        }

        & label {
            position: absolute;
            top: 0;
            left: 0;
            width: 16px;
            height: 16px;
            border: 1px solid $grey;
            margin: 1px;
            box-sizing: border-box;
            border-radius: 2px;

            &::after {
                position: absolute;
                top: 3px;
                left: 2px;
                width: 8px;
                height: 4px;
                border-left: 2px solid $white;
                border-bottom: 2px solid $white;
                transform: rotate(-45deg);
                opacity: 0;
                content: "";
            }
        }

        &--checked {
            label::after {
                opacity: 1;
            }
        }

        &--checked-any {
            label::after {
                top: 3px;
                left: 2px;
                height: 0.5px;
                border-left: none;
                transform: translate(1px, 2px);
                border-bottom: 2px solid $white;
            }
        }

        &--disabled {
            pointer-events: none;

            label, label::after {
                background-color: $lightGrey;
                border-color: $darkGrey;
            }
        }

        &--checked, &--checked-any {
            &:not(#{$checkbox}--disabled) {
                & label {
                    border-color: $success;
                    background-color: $success;
                }
            }

            & label::after {
                opacity: 1;
            }
        }
    }
</style>
