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
    name: 'IconMedia',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M21,19 L21,5 C21,3.9 20.1,3 19,3 L5,3 C3.9,3 3,3.9 3,5 L3,19 C3,20.1 3.9,21 5,21 L19,21 C20.1,21 21,20.1 21,19 Z M8.5,13.5 L11,16.5 L14.5,12 L19,18 L5,18 L8.5,13.5 Z';
        },
    },
};
</script>
