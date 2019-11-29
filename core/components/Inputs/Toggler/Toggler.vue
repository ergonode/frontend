/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="toggler">
        <input
            :id="associatedLabel"
            :value="value"
            :disabled="disabled"
            type="checkbox"
            @input="onValueChange">
        <label :for="associatedLabel">
            <div class="toggler__state" />
        </label>
        <span
            v-if="label"
            class="toggler__label"
            v-text="label" />
        <slot name="append" />
    </div>
</template>

<script>
export default {
    name: 'Toggler',
    props: {
        value: {
            type: Boolean,
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
    mounted() {
        // eslint-disable-next-line no-underscore-dangle
        this.associatedLabel = `input-${this._uid}`;
    },
    methods: {
        onValueChange() {
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
        grid-template-columns: max-content max-content;
        grid-auto-flow: column;
        column-gap: 8px;
        align-items: center;

        & label {
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            width: 30px;

            &::before {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
                width: 100%;
                height: 12px;
                background-color: $GREY_LIGHT;
                border-radius: 8px;
                box-shadow: $ELEVATOR_HOLE;
                content: "";
            }
        }

        &__state {
            position: relative;
            z-index: 1;
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
        }

        & input[type="checkbox"] {
            position: absolute;
            top: 0;
            left: 0;
            visibility: hidden;

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
