/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :style="floatingStyle"
        :class="classes"
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
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
    GREY_DARK,
    RED,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

/**
 * `Fab` is a default component to display action in page.
 * It may have any icon component inside `icon` slot.
 */
export default {
    name: 'Fab',
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
            default: SIZE.SMALL,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * Determinate if the component is disabled
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
            if (this.theme === THEME.DESTRUCTIVE) {
                if (this.disabled) {
                    return GREY_DARK;
                }

                if (this.isHovered) {
                    return RED;
                }

                return GRAPHITE;
            }

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
        classes() {
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

        &--primary {
            background-color: $GREEN;

            &:disabled {
                background-color: $GREY;
            }

            &:hover:not(:disabled), &:focus {
                box-shadow: $ELEVATOR_HOVER_FOCUS;
            }
        }

        &--destructive {
            &:hover:not(:disabled), &:focus {
                box-shadow: $ELEVATOR_DESTRUCTIVE_HOVER_FOCUS;
            }
        }

        &--secondary {
            &:hover:not(:disabled), &:focus {
                background-color: $WHITE;
                box-shadow: $ELEVATOR_HOVER_FOCUS;
            }
        }

        &--destructive, &--secondary, &--secondary-plain {
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
