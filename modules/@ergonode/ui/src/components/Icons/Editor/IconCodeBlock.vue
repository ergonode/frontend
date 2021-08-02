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
    name: 'IconCodeBlock',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M6.86485459,17 L2,12 L6.86485459,7 L8,8.16664063 L4.27029081,12 L8,15.8333203 L6.86485459,17 Z M17.1351454,7 L22,12 L17.1351454,17 L16,15.8333594 L19.7297092,12 L16,8.16667969 L17.1351454,7 Z M13.1041839,5 L14.6570982,5 L10.9058095,19 L9.35289525,19 L13.1041839,5 Z';
        },
    },
};
</script>
