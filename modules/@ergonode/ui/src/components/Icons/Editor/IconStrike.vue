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
    name: 'IconStrike',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M10 20H14V16H10V20ZM5 4V7H10V10H14V7H19V4H5ZM3 14H21V12H3V14Z';
        },
    },
};
</script>
