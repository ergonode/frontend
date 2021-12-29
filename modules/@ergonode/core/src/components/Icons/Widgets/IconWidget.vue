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
    name: 'IconWidget',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M13,21 L13,15 L21,15 L21,21 L13,21 Z M3,21 L3,19 L11,19 L11,21 L3,21 Z M3,13 L3,7 L21,7 L21,13 L3,13 Z M3,17 L3,15 L11,15 L11,17 L3,17 Z M3,3 L11,3 L11,5 L3,5 L3,3 Z M13,3 L21,3 L21,5 L13,5 L13,3 Z';
        },
    },
};
</script>
