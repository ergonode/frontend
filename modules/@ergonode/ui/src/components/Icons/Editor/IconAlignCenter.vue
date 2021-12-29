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

export default {
    name: 'IconAlignCenter',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M8,14 L16,14 L16,16 L8,16 L8,14 Z M5,17 L19,17 L19,19 L5,19 L5,17 Z M5,11 L19,11 L19,13 L5,13 L5,11 Z M8,8 L16,8 L16,10 L8,10 L8,8 Z M5,5 L19,5 L19,7 L5,7 L5,5 Z';
        },
    },
};
</script>
