/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        type="button"
        :class="buttonClasses"
        :disabled="disabled"
        :aria-label="title">
        <slot
            name="prepend"
            :color="foregroundColor" />
        <span
            v-if="title"
            :class="titleClasses"
            v-text="title" />
        <slot
            name="append"
            :color="foregroundColor" />
        <slot />
    </button>
</template>
<script>
import { THEMES, SIZES } from '@Core/defaults/buttons';
import {
    GRAPHITE, GREY_DARK, WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'Button',
    props: {
        theme: {
            type: String,
            default: THEMES.PRIMARY,
            validator: value => Object.values(THEMES).indexOf(value) !== -1,
        },
        size: {
            type: String,
            default: SIZES.REGULAR,
            validator: value => Object.values(SIZES).indexOf(value) !== -1,
        },
        title: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        foregroundColor() {
            if (this.theme === THEMES.SECONDARY) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                return GRAPHITE;
            }

            return WHITE;
        },
        buttonClasses() {
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
        border: none;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        text-transform: uppercase;
        cursor: pointer;
        outline: none;

        &:disabled {
            cursor: not-allowed;
        }

        &:hover:not(:disabled), &:focus {
            box-shadow: $ELEVATOR_HOVER_FOCUS;
        }

        &__title {
            margin: 0 4px;
            letter-spacing: 0.5px;
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

            &:hover:not(:disabled) {
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
            padding: 0 4px;
        }

        &--tiny, &--small {
            #{$button}__title {
                font: $FONT_BOLD_12_16;
            }
        }
    }
</style>
