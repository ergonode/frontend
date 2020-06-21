/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :style="floatingStyle"
        :class="fabClasses"
        :disabled="disabled"
        @mouseenter="onFocus"
        @mouseleave="onBlur"
        @focus="onFocus"
        @blur="onBlur">
        <!--
            @slot Icon
            @binding {string} fill-color fill-color of an icon
            @binding {boolean} is-hovered hovered state of Fab
        -->
        <slot
            name="icon"
            :color="iconFillColor"
            :is-hovered="isHovered" />
    </button>
</template>
<script>
import {
    GRAPHITE,
    GREEN,
    GREY_DARK,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'Fab',
    props: {
        /**
         * The theme of the fab
         * @values primary, secondary, secondary-plain
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
        /**
         * The size of the fab
         * @values regular, small, tiny
         */
        size: {
            type: String,
            default: SIZE.SMALL,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * The disabled state of the fab
         * @values primary, secondary
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The floating state, absolute position relative to parent
         * @values top, left, bottom, right
         */
        floating: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        iconFillColor() {
            if (this.theme !== THEME.PRIMARY) {
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
        floatingStyle() {
            if (!this.floating) return null;

            return {
                position: 'absolute',
                ...this.floating,
            };
        },
        fabClasses() {
            return [
                'fab',
                `fab--${this.theme}`,
                `fab--${this.size}`,
            ];
        },
    },
    methods: {
        onFocus() {
            this.isHovered = true;
        },
        onBlur() {
            this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .fab {
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        border: none;
        box-sizing: border-box;
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

            &:hover:not(:disabled) {
                background-color: $WHITE;
            }
        }

        &--secondary-plain {
            background-color: transparent;
        }

        &--regular {
            width: 40px;
            height: 40px;
            padding: 8px;
            border-radius: 20px;
        }

        &--small {
            width: 32px;
            height: 32px;
            padding: 4px;
            border-radius: 16px;
        }

        &--tiny {
            width: 24px;
            height: 24px;
            padding: 0;
            border-radius: 12px;
        }
    }
</style>
