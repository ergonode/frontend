/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="calendarNodeStateClasses">
        <span
            class="node__title typo-btn--xs"
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
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
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
