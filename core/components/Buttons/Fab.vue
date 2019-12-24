/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        v-bind="$attrs"
        fab
        @mouseenter.native="onMouseEnter"
        @mouseleave.native="onMouseLeave">
        <template #append>
            <slot
                name="icon"
                :fill-color="iconFillColor"
                :is-hovered="isHovered" />
        </template>
    </Button>
</template>
<script>
import { THEMES } from '~/defaults/buttons';
import {
    GREEN, GRAPHITE, WHITE, GREY_DARK,
} from '~/assets/scss/_variables/_colors.scss';
import Button from '~/core/components/Buttons/Button';

export default {
    name: 'Fab',
    inheritAttrs: false,
    components: {
        Button,
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        iconFillColor() {
            if (this.$attrs.theme === THEMES.SECONDARY) {
                if (this.$attrs.disabled) {
                    return GREY_DARK;
                }
                if (this.isHovered) {
                    return GREEN;
                }
                return GRAPHITE;
            }

            return WHITE;
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
