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
    name: 'IconText',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5,3 L19,3 C20.1045695,3 21,3.8954305 21,5 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,5 C3,3.8954305 3.8954305,3 5,3 Z M11,9 L11,17 L13,17 L13,9 L16,9 L16,7 L8,7 L8,9 L11,9 Z';
        },
    },
};
</script>
