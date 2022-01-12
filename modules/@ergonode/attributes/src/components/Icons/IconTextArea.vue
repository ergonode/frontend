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
    name: 'IconTextArea',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5,3 L19,3 C20.1045695,3 21,3.8954305 21,5 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,5 C3,3.8954305 3.8954305,3 5,3 Z M6,11 L6,13 L18,13 L18,11 L6,11 Z M6,15 L6,17 L11,17 L11,15 L6,15 Z M6,7 L6,9 L18,9 L18,7 L6,7 Z';
        },
    },
};
</script>
