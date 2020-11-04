/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        type="button"
        :class="classes"
        :disabled="disabled">
        <!--
            @slot Icon
            @binding {string} color color of an icon
        -->
        <slot
            name="icon"
            :color="foregroundColor" />
        <slot />
    </button>
</template>
<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREY_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'IconButton',
    props: {
        /**
         * The theme of the component
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        foregroundColor() {
            if (this.theme === THEME.SECONDARY) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                return GRAPHITE;
            }

            return WHITE;
        },
        classes() {
            return [
                'icon-button',
                `icon-button--${this.theme}`,
                `icon-button--${this.size}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .icon-button {
        $button: &;

        position: relative;
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        border: none;
        padding: 0;
        margin: 0;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        text-transform: uppercase;
        cursor: pointer;
        outline: none;

        &:disabled {
            cursor: not-allowed;
        }

        &--primary {
            background-color: $GREEN;

            &:hover:not(:disabled), &:focus {
                box-shadow: $ELEVATOR_HOVER_FOCUS;
            }
        }

        &--error {
            background-color: $RED;

            &:hover:not(:disabled), &:focus {
                box-shadow: $ELEVATOR_DESTRUCTIVE_HOVER_FOCUS;
            }
        }

        &--primary, &--error {
            &:disabled {
                background-color: $GREY;
            }
        }

        &--secondary {
            background-color: transparent;

            &:hover:not(:disabled), &:focus {
                background-color: $WHITE;
                box-shadow: $ELEVATOR_HOVER_FOCUS;
            }
        }

        &--secondary-plain {
            background-color: transparent;
        }

        &--regular {
            width: 40px;
            height: 40px;
        }

        &--small {
            width: 32px;
            height: 32px;
        }

        &--tiny {
            width: 24px;
            height: 24px;
        }
    }
</style>
