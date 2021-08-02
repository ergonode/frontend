/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands" />
    </Icon>
</template>

<script>
import {
    ALIGN,
} from '@Core/defaults/icons';

export default {
    name: 'IconAlignLeft',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M3,17 L21,17 L21,19 L3,19 L3,17 Z M3,14 L15,14 L15,16 L3,16 L3,14 Z M3,8 L15,8 L15,10 L3,10 L3,8 Z M3,11 L21,11 L21,13 L3,13 L3,11 Z M3,5 L21,5 L21,7 L3,7 L3,5 Z';
        },
        iconTransform() {
            if (this.state === ALIGN.RIGHT) return 'translate(12, 12) scale(-1, 1) translate(-12, -12)';

            return null;
        },
    },
};
</script>
