/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="['fab-btn', `fab-btn--${theme}`,{'shadow': shadow, 'fab-btn--hovered': isHovered}]"
        :disabled="isDisabled"
        :aria-label="iconPath"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot
            name="icon"
            :icon-fill-color="iconFillColor">
            <Component
                :is="iconComponent"
                :fill-color="iconFillColor" />
        </slot>
    </button>
</template>

<script>
import ButtonTheme from '~/model/theme/button-theme';
import {
    primary, graphite, grey, white,
} from '~/model/theme/colors';

export default {
    name: 'IconFabButton',
    props: {
        theme: {
            type: String,
            default: 'primary',
            validator: (value) => ButtonTheme.indexOf(value) !== -1,
        },
        shadow: {
            type: Boolean,
            default: false,
        },
        iconPath: {
            type: String,
            required: true,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isStateable: {
            type: Boolean,
            default: false,
        },
        isSelected: {
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
        iconComponent() {
            return () => import(`~/components/Icon/${this.iconPath}`);
        },
        iconFillColor() {
            if (this.isDisabled) {
                if (ButtonTheme.primary) {
                    return white;
                }
                return grey;
            }

            if (this.isStateable) {
                if (this.isSelected || this.isHovered) {
                    return primary;
                }

                return graphite;
            }

            if (this.isHovered && (!this.isStateable || !this.isSelected)) {
                return primary;
            }

            return graphite;
        },
    },
    methods: {
        onClick() {
            this.$emit('select', !this.isSelected);
        },
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
    .fab-btn {
        position: relative;
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border: none;
        padding: 0;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        cursor: pointer;
        outline: none;
        border-radius: 50%;

        &--hovered {
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &--primary {
            background-color: $primary;
        }

        &--primary:disabled {
            background-color: $grey;
        }

        &--secondary {
            background-color: transparent;
        }
    }
</style>
