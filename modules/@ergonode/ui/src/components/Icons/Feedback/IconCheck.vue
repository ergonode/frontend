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
    name: 'IconCheck',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M8.99999 16.2001L4.79999 12.0001L3.39999 13.4001L8.99999 19.0001L21 7.0001L19.6 5.6001L8.99999 16.2001Z';
        },
    },
};
</script>
