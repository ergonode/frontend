/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['toggler', togglerStateClasses]"
        @click="onClick">
        <div class="toggler__state-wrapper">
            <Icon
                v-if="value"
                icon="switch-positive" />
        </div>
    </div>
</template>

<script>
import Icon from '~/components/Icon/Icon';

export default {
    name: 'Toggler',
    components: {
        Icon,
    },
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
        width: 30px;

        &::before {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
            width: 100%;
            height: 12px;
            border-radius: 8px;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
            content: "";
        }

        &__state-wrapper {
            z-index: 1;
            display: flex;
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background-color: $white;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &--selected {
            justify-content: flex-end;

            #{$toogler}__state-wrapper {
                background-color: $success;
            }
        }

        &--disabled {
            pointer-events: none;

            #{$toogler}__state-wrapper {
                background-color: $darkGrey;
            }
        }
    }
</style>
