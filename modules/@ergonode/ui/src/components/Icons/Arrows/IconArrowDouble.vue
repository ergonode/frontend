/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        v-bind="$attrs"
        :style="iconTransform">
        <path :d="drawingCommands" />
    </Icon>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';

export default {
    name: 'IconArrowDouble',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M16.59,11.3 L18,12.71 L12,18.71 L6,12.71 L7.41,11.3 L12,15.88 L16.59,11.3 Z M16.59,5.3 L18,6.71 L12,12.71 L6,6.71 L7.41,5.3 L12,9.88 L16.59,5.3 Z';
        },
        iconTransform() {
            if (this.$attrs.state === ARROW.LEFT) {
                return {
                    transform: 'rotate(-270deg)',
                };
            }
            if (this.$attrs.state === ARROW.RIGHT) {
                return {
                    transform: 'rotate(-90deg)',
                };
            }
            if (this.$attrs.state === ARROW.UP) {
                return {
                    transform: 'rotate(-180deg)',
                };
            }

            return null;
        },
    },
};
</script>
