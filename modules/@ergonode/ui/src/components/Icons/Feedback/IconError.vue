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
    name: 'IconError',
    computed: {
        drawingCommands() {
            return 'M1,20 L23,20 L12,1 L1,20 L1,20 Z M13,17 L11,17 L11,15 L13,15 L13,17 L13,17 Z M13,13 L11,13 L11,9 L13,9 L13,13 L13,13 Z';
        },
    },
};
</script>
