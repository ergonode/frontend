/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        type="button"
        :class="btnFabClasses"
        :disabled="disabled"
        :aria-label="title"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot
            name="icon"
            :color="iconFillColor" />
    </button>
</template>
<script>
import { THEMES } from '@Core/defaults/buttons';
import {
    GREEN, GRAPHITE, WHITE, GREY_DARK,
} from '~/assets/scss/_variables/_colors.scss';
import buttonPropsMixin from '~/mixins/buttons/buttonPropsMixin';

export default {
    name: 'FabButton',
    mixins: [buttonPropsMixin],
    props: {
        isStateable: {
            type: Boolean,
            default: false,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        hoverColor: {
            type: String,
            default: null,
        },
        isTransparent: {
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
        btnFabClasses() {
            return [
                'btn',
                'btn--fab',
                `btn--${this.theme}`,
                `btn--${this.size}`,
                {
                    'btn--fab__transparent': this.isTransparent,
                    'btn--plain': this.plain,
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
                    return this.hoverColor || GREEN;
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
    @import "~assets/scss/button.scss";

    .btn--fab {
        width: 32px;
        height: 32px;
        padding: 0;
        border-radius: 50%;

        &__transparent {
            background-color: transparent;

            &:hover {
                box-shadow: none !important;
            }
        }
    }
</style>
