/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="calendarNodeStateClasses">
        <span
            class="node__title font--medium-12-16"
            v-text="title" />
    </div>
</template>

<script>
export default {
    name: 'DatePickerCalendarNode',
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
        hovered: {
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
            type: [String, Number],
            required: true,
        },
    },
    computed: {
        calendarNodeStateClasses() {
            return [
                'node',
                {
                    'node--selected': this.selected,
                    'node--disabled': this.disabled,
                    'node--current': this.current,
                    'node--hovered': this.hovered,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .node {
        $node: &;

        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        cursor: pointer;

        &--hovered {
            box-shadow: $ELEVATOR_2_DP;
        }

        &:not(&--selected) &:not(&--disabled) {
            #{$node}__title {
                color: $GRAPHITE_DARK;
            }
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

            #{$node}__title {
                font-weight: 700;
            }
        }

        &--selected {
            background-color: $GREEN;

            #{$node}__title {
                color: $WHITE;
            }

            &::after {
                background-color: $WHITE;
            }
        }

        &--disabled {
            #{$node}__title {
                color: $GRAPHITE_LIGHT;
            }
        }
    }
</style>
