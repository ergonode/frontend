/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="fabClasses"
        :disabled="disabled"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot
            name="icon"
            :fill-color="iconFillColor"
            :is-hovered="isHovered" />
    </button>
</template>
<script>
import { THEMES } from '@Core/defaults/buttons';
import {
    GREEN, GRAPHITE, WHITE, GREY_DARK,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'Fab',
    props: {
        theme: {
            type: String,
            default: THEMES.PRIMARY,
            validator: value => Object.values(THEMES).indexOf(value) !== -1,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        iconFillColor() {
            if (this.theme !== THEMES.PRIMARY) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                if (this.isHovered) {
                    return GREEN;
                }
                return GRAPHITE;
            }

            return WHITE;
        },
        fabClasses() {
            return [
                'fab',
                `fab--${this.theme}`,
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
    .fab {
        position: relative;
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border: none;
        padding: 4px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        text-transform: uppercase;
        cursor: pointer;
        outline: none;
        border-radius: 16px;

        &:disabled {
            cursor: not-allowed;
        }

        &:hover:not(:disabled):not(&--secondary-plain), &:focus {
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

            &:hover:not(:disabled) {
                background-color: $WHITE;
            }
        }

        &--secondary-plain {
            background-color: transparent;
        }
    }
</style>
