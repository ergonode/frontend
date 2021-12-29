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
    name: 'IconResize',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M7 1H8V2H7V1ZM6 3V2H7V3H6ZM5 4V3H6V4H5ZM4 5V4H5V5H4ZM3 6V5H4V6H3ZM2 7V6H3V7H2ZM2 7V8H1V7H2ZM7 6H6V7H5V8H6V7H7V6ZM7 6V5H8V6H7Z';
        },
    },
};
</script>
