/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="btnClasses"
        :disabled="disabled"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot
            name="icon"
            :icon-fill-color="iconFillColor" />
    </button>
</template>

<script>
import { THEMES } from '~/defaults/buttons';
import {
    GREEN, GRAPHITE, WHITE, GREY_DARK,
} from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'IconFabButton',
    props: {
        theme: {
            type: String,
            default: THEMES.PRIMARY,
            validator: (value) => Object.values(THEMES).indexOf(value) !== -1,
        },
        plain: {
            type: Boolean,
            default: false,
        },
        disabled: {
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
        btnClasses() {
            return [
                'fab-btn',
                `fab-btn--${this.theme}`,
                {
                    'fab-btn--plain': this.plain,
                    'fab-btn--hovered': this.isHovered,
                },
            ];
        },
        iconFillColor() {
            if (this.theme === THEMES.SECONDARY) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                if ((this.isHovered && (!this.isStateable || !this.isSelected))
                    || (this.isStateable && (this.isSelected || this.isHovered))
                ) {
                    return GREEN;
                }
                return GRAPHITE;
            }

            return WHITE;
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
    @import "~assets/scss/fab-button.scss";
</style>
