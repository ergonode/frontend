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
import { STATE } from '~/defaults/inputs/checkbox';

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
        this.associatedLabel = `checkbox-${this._uid}`;
    },
    computed: {
        checkboxStateClasses() {
            return [
                {
                    'checkbox--disabled': this.disabled,
                    'checkbox--checked': this.value,
                    'checkbox--checked-any': this.value === STATE.CHECK_ANY,
                },
            ];
        },
    },
    methods: {
        onValueChange() {
            if (Number.isInteger(this.value)) {
                if (this.value === STATE.CHECK_ANY) {
                    this.$emit('input', STATE.UNCHECK);
                } else {
                    this.$emit('input', this.value === STATE.UNCHECK ? this.value + 1 : this.value - 1);
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

        &, & input[type="checkbox"], & label {
            width: 16px;
            height: 16px;
        }

        & input[type="checkbox"] {
            margin: 0;
            visibility: hidden;
        }

        & label {
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid $GREY;
            box-sizing: border-box;
            cursor: pointer;

            &::after {
                position: absolute;
                top: 3px;
                left: 2px;
                width: 8px;
                height: 4px;
                border-left: 2px solid $WHITE;
                border-bottom: 2px solid $WHITE;
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
                top: 4px;
                left: 2px;
                height: 0.5px;
                border-left: none;
                transform: translate(1px, 2px);
                border-bottom: 2px solid $WHITE;
            }
        }

        &--disabled {
            pointer-events: none;

            label, label::after {
                background-color: $GREY_LIGHT;
                border-color: $GREY_DARK;
            }
        }

        &--checked, &--checked-any {
            &:not(#{$checkbox}--disabled) {
                & label {
                    border-color: $GREEN;
                    background-color: $GREEN;
                }
            }

            & label::after {
                opacity: 1;
            }
        }
    }
</style>
