/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div :class="['radio', radioStateClasses]">
        <input
            :id="associatedLabel"
            v-model="radioValue"
            type="radio"
            :value="label"
            :name="name">
        <label :for="associatedLabel">
            <div
                v-show="isSelected"
                class="radio__mark" />
        </label>
    </div>
</template>

<script>

export default {
    name: 'RadioButton',
    props: {
        value: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
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
        this.associatedLabel = `radio-${this._uid}`;
    },
    computed: {
        isSelected() {
            return this.value === this.label;
        },
        radioValue: {
            get() {
                return this.value;
            },
            set() {
                this.$emit('input', this.label);
            },
        },
        radioStateClasses() {
            return [
                {
                    'radio--disabled': this.disabled,
                    'radio--selected': this.isSelected,
                },
            ];
        },
    },
};
</script>


<style lang="scss" scoped>
    .radio {
        $radio: &;

        position: relative;

        &, & input[type="radio"], & label {
            width: 18px;
            height: 18px;
        }

        & input[type="radio"] {
            margin: 0;
            visibility: hidden;
        }

        & label {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid $GREY;
            box-sizing: border-box;
            cursor: pointer;
        }

        & label, &__mark {
            border-radius: 50%;
        }

        &__mark {
            flex-basis: 10px;
            height: 10px;
            background-color: $GREEN;
        }

        &--selected {
            &:not(#{$radio}--disabled) {
                & label {
                    border: $BORDER_2_GREEN;
                }
            }
        }

        &--disabled {
            pointer-events: none;

            label {
                background-color: $GREY_LIGHT;
            }

            #{$radio}__mark {
                background-color: $GREY_DARK;
            }
        }
    }
</style>
