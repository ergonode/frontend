/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="classes"
        v-text="title" />
</template>

<script>
export default {
    name: 'DatePickerNode',
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        current: {
            type: Boolean,
            default: false,
        },
        title: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
    },
    computed: {
        classes() {
            return [
                'node',
                {
                    'node--selected': this.selected,
                    'node--disabled': this.disabled,
                    'node--current': this.current,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .node {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font: $FONT_MEDIUM_12_16;
        cursor: pointer;

        &:not(&--selected):not(&--disabled) {
            color: $GRAPHITE_DARK;
        }

        &--current {
            &::after {
                position: absolute;
                bottom: 7px;
                width: 16px;
                height: 1px;
                background-color: $GRAPHITE_DARK;
                content: "";
            }
        }

        &--current, &--selected {
            font: $FONT_BOLD_12_16;
        }

        &--selected {
            background-color: $GREEN;
            color: $WHITE;

            &::after {
                background-color: $WHITE;
            }
        }

        &--disabled {
            color: $GRAPHITE_LIGHT;
        }
    }
</style>
