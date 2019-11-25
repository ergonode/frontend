/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        type="button"
        :class="btnClasses"
        :disabled="disabled || !loaded"
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
import { THEMES, SIZES } from '~/defaults/buttons';
import {
    GRAPHITE, GREY_DARK, WHITE,
} from '~/assets/scss/_variables/_colors.scss';
import buttonPropsMixin from '~/mixins/buttons/buttonPropsMixin';

export default {
    name: 'Button',
    mixins: [buttonPropsMixin],
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
        btnClasses() {
            return [
                'btn',
                `btn--${this.theme}`,
                `btn--${this.size}`,
                {
                    'btn--plain': this.plain,
                },
            ];
        },
        titleClasses() {
            return [
                'btn__title',
                {
                    'font--semi-bold-14-16': this.size === SIZES.REGULAR,
                    'font--semi-bold-12-16': this.size === SIZES.SMALL || this.size === SIZES.TINY,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/button.scss";
</style>
