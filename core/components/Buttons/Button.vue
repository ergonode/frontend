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
import { THEMES } from '~/defaults/buttons';
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
        buttonClasses() {
            return [
                'button',
                `button--${this.theme}`,
                `button--${this.size}`,
                {
                    'button--plain': this.plain,
                    'button--fab': this.fab,
                },
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
    @import "~assets/scss/button.scss";
</style>
