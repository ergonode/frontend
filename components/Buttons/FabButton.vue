/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseButton
        class="btn--fab"
        :disabled="disabled"
        :title="title"
        :size="size"
        :theme="theme"
        @click.native="onClick"
        @mouseenter.native="onMouseEnter"
        @mouseleave.native="onMouseLeave">
        <template #append>
            <slot
                name="icon"
                :color="iconFillColor" />
        </template>
    </BaseButton>
</template>
<script>
import { THEMES } from '~/defaults/buttons';
import {
    GREEN, GRAPHITE, WHITE, GREY_DARK,
} from '~/assets/scss/_variables/_colors.scss';
import buttonPropsMixin from '~/mixins/buttons/buttonPropsMixin';
import BaseButton from '~/components/Buttons/BaseButton';

export default {
    name: 'FabButton',
    mixins: [buttonPropsMixin],
    components: {
        BaseButton,
    },
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
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
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
    .btn--fab {
        width: 32px;
        height: 32px;
        padding: 0;
        border-radius: 50%;
    }
</style>
