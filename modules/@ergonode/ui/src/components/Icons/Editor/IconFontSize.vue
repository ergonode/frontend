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
    name: 'IconFontSize',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M3,13 L3,10 L12,10 L12,13 L9,13 L9,19 L6,19 L6,13 L3,13 Z M10,5 L21,5 L21,8 L17,8 L17,19 L14,19 L14,8 L10,8 L10,5 Z';
        },
    },
};
</script>
