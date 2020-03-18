/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div class="checkbox">
        <input
            :id="associatedLabel"
            ref="checkbox"
            type="checkbox"
            :checked="value"
            :disabled="disabled"
            @input="onValueChange">
        <label :for="associatedLabel">
            <div class="checkbox__check" />
            <span
                v-if="label"
                class="checkbox__label"
                v-text="label" />
        </label>
        <slot name="append" />
    </div>
</template>

<script>
import { STATE } from '@Core/defaults/inputs/checkbox';

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
        label: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            associatedLabel: '',
        };
    },
    watch: {
        value() {
            this.setIndeterminateState();
        },
    },
    mounted() {
        this.setIndeterminateState();
        this.associatedLabel = `checkbox-${this._uid}`;
    },
    methods: {
        setIndeterminateState() {
            this.$refs.checkbox.indeterminate = this.value === 2;
        },
        onValueChange() {
            if (Number.isInteger(this.value)) {
                if (this.value === STATE.CHECK_ANY) {
                    this.$emit('input', STATE.UNCHECK);
                } else {
                    const value = this.value === STATE.UNCHECK ? this.value + 1 : this.value - 1;
                    this.$emit('input', value);
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
        display: grid;
        grid-template-columns: max-content;
        grid-auto-flow: column;
        column-gap: 8px;
        align-items: center;

        & label {
            position: relative;
            display: grid;
            grid-auto-flow: column;
            column-gap: 8px;
            align-items: center;
        }

        &__label {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            cursor: pointer;
        }

        &__check {
            position: relative;
            display: flex;
            width: 16px;
            height: 16px;
            border: 1px solid $GREY;
            box-sizing: border-box;
            cursor: pointer;
        }

        & input[type="checkbox"] {
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            opacity: 0;

            &:focus + label {
                #{$checkbox}__check {
                    box-shadow: $ELEVATOR_HOVER_FOCUS;
                }
            }

            &:checked + label, &:indeterminate + label {
                #{$checkbox}__check::before {
                    position: absolute;
                    transform: rotate(45deg);
                    content: "";
                }
            }

            &:not(:indeterminate):checked + label {
                #{$checkbox}__check::before {
                    width: 4px;
                    height: 8px;
                    border-right: 2px solid $WHITE;
                    border-bottom: 2px solid $WHITE;
                }
            }

            &:indeterminate + label {
                #{$checkbox}__check::before {
                    width: 10px;
                    height: 2px;
                    background-color: $WHITE;
                    transform: none;
                }
            }

            &:not(:disabled) {
                &:checked + label, &:indeterminate + label {
                    #{$checkbox}__check {
                        border: none;
                        background-color: $GREEN;
                    }
                }

                &:not(:indeterminate):checked + label {
                    #{$checkbox}__check::before {
                        top: 2px;
                        left: 5px;
                    }
                }

                &:indeterminate + label {
                    #{$checkbox}__check::before {
                        top: 7px;
                        left: 3px;
                    }
                }
            }

            &:disabled {
                & + label {
                    #{$checkbox}__check {
                        background-color: $GREY_LIGHT;
                    }
                }

                &:checked + label {
                    #{$checkbox}__check::before {
                        top: 1px;
                        left: 4px;
                        border-color: $GREY_DARK;
                    }
                }

                &:indeterminate + label {
                    #{$checkbox}__check::before {
                        top: 6px;
                        left: 2px;
                        background-color: $GREY_DARK;
                    }
                }
            }
        }
    }
</style>
