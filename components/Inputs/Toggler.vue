/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['toggler', togglerStateClasses]"
        @click="onClick">
        <div class="toggler__state-wrapper" />
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
    },
    computed: {
        togglerStateClasses() {
            return [{
                'toggler--selected': this.value,
                'toggler--disabled': this.disabled,
            }];
        },
    },
    methods: {
        onClick() {
            this.$emit('input', !this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .toggler {
        $toogler: &;

        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 30px;

        &::before {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
            width: 100%;
            height: 12px;
            border-radius: 8px;
            box-shadow: $ELEVATOR_HOLE;
            content: "";
        }

        &__state-wrapper {
            position: relative;
            z-index: 1;
            display: flex;
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background-color: $WHITE;
            box-shadow: $ELEVATOR_2_DP;

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

        &--selected {
            justify-content: flex-end;

            #{$toogler}__state-wrapper {
                background-color: $GREEN;
            }

            #{$toogler}__state-wrapper::after {
                opacity: 1;
            }
        }

        &--disabled {
            pointer-events: none;

            #{$toogler}__state-wrapper {
                background-color: $GREY_DARK;
            }
        }
    }
</style>
