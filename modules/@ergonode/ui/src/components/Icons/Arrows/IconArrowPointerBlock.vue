/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        v-bind="$attrs"
        :style="iconTransform">
        <rect
            width="2"
            height="12"
            transform="matrix(-1 0 0 1 8 6)" />
        <path :d="drawingCommands" />
    </Icon>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';

export default {
    name: 'IconArrowPointerBlock',
    computed: {
        drawingCommands() {
            return 'M18 7.415L13.42 12.005L18 16.595L16.59 18.005L10.59 12.005L16.59 6.005L18 7.415Z';
        },
        iconTransform() {
            if (this.$attrs.state === ARROW.RIGHT) {
                return {
                    transform: 'rotate(-180deg)',
                };
            }

            return null;
        },
    },
};
</script>
