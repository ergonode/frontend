/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="classes"
        v-text="title"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave" />
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
        withinRange: {
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
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        classes() {
            return [
                'date-picker-node',
                {
                    'date-picker-node--selected': this.selected,
                    'date-picker-node--within-range': this.withinRange && !this.selected,
                    'date-picker-node--disabled': this.disabled,
                    'date-picker-node--current': this.current,
                    'date-picker-node--hovered': this.isHovered,
                },
            ];
        },
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker-node {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font: $FONT_MEDIUM_12_16;
        cursor: pointer;

        &::before {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            box-shadow: $ELEVATOR_HOVER_FOCUS;
            transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            opacity: 0;
            content: "";
        }

        &--within-range {
            background-color: $GREEN_LIGHT;
        }

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

        &--hovered::before {
            opacity: 1;
        }

        &--disabled {
            color: $GRAPHITE_LIGHT;
            pointer-events: none;
            cursor: not-allowed;
        }
    }
</style>
