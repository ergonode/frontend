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
    name: 'IconItalic',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M10 5V8H12.21L8.79 16H6V19H14V16H11.79L15.21 8H18V5H10Z';
        },
    },
};
</script>
