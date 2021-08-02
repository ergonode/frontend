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
    name: 'IconTemplates',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M11,20 L15,20 L15,13 L11,13 L11,20 Z M3,20 L9,20 L9,4 L3,4 L3,20 Z M17,20 L21,20 L21,13 L17,13 L17,20 Z M11,4 L11,11 L21,11 L21,4 L11,4 Z';
        },
    },
};
</script>
