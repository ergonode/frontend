/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        type="button"
        :class="classes"
        :disabled="disabled"
        :aria-label="title">
        <!--
            @slot Prepend element - icon recommended
            @binding {string} color color of an element
        -->
        <slot
            name="prepend"
            :color="foregroundColor" />
        <span
            v-if="title"
            :class="titleClasses"
            v-text="title" />
        <!--
            @slot Append element - icon recommended
            @binding {string} color color of an element
        -->
        <slot
            name="append"
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
    name: 'Button',
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
                'button',
                `button--${this.theme}`,
                `button--${this.size}`,
            ];
        },
        titleClasses() {
            return [
                'button__title',
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .button {
        $button: &;

        position: relative;
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        width: max-content;
        border: none;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        text-transform: uppercase;
        cursor: pointer;
        outline: none;

        &__title {
            letter-spacing: 0.5px;
        }

        &:disabled {
            cursor: not-allowed;
        }

        &:hover:not(:disabled), &:focus {
            box-shadow: $ELEVATOR_HOVER_FOCUS;
        }

        &--primary {
            background-color: $GREEN;
            color: $WHITE;

            &:disabled {
                background-color: $GREY;
            }
        }

        &--secondary {
            background-color: transparent;
            color: $GRAPHITE;

            &:disabled {
                color: $GREY_DARK;
            }

            &:hover:not(:disabled), &:focus {
                background-color: $WHITE;
            }
        }

        &--regular {
            height: 40px;
            padding: 0 12px;
            font: $FONT_BOLD_14_20;
        }

        &--small {
            height: 32px;
            padding: 0 8px;
        }

        &--tiny {
            height: 24px;
            padding: 0 3px;

            #{$button}__title {
                margin: 0 3px;
            }
        }

        &--small, &--regular {
            #{$button}__title {
                margin: 0 4px;
            }
        }

        &--tiny, &--small {
            #{$button}__title {
                font: $FONT_BOLD_12_16;
            }
        }
    }
</style>
