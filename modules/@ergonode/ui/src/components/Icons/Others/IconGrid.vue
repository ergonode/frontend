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
    name: 'IconGrid',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5,7 L9,7 L9,10 L5,10 L5,7 Z M5,11 L9,11 L9,14 L5,14 L5,11 Z M5,15 L9,15 L9,18 L5,18 L5,15 Z M10,7 L14,7 L14,10 L10,10 L10,7 Z M10,11 L14,11 L14,14 L10,14 L10,11 Z M10,15 L14,15 L14,18 L10,18 L10,15 Z M15,7 L19,7 L19,10 L15,10 L15,7 Z M15,11 L19,11 L19,14 L15,14 L15,11 Z M15,15 L19,15 L19,18 L15,18 L15,15 Z';
        },
    },
};
</script>
