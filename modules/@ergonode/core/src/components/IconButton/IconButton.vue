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
    GRAPHITE,
    GREY_DARK,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'IconButton',
    props: {
        /**
         * The theme of the button
         * @values primary, secondary
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
        /**
         * The size of the button
         * @values regular, small, tiny
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * The title of the button
         * @values primary, secondary
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The disabled state of the button
         * @values primary, secondary
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

        &:hover:not(:disabled):not(&--secondary-plain), &:focus:not(&--secondary-plain) {
            box-shadow: $ELEVATOR_HOVER_FOCUS;
        }

        &--primary {
            background-color: $GREEN;

            &:disabled {
                background-color: $GREY;
            }
        }

        &--secondary {
            background-color: transparent;

            &:hover:not(:disabled), &:focus {
                background-color: $WHITE;
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
