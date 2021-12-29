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
    name: 'IconIndentionLeft',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5,12 L8,9 L8,15 L5,12 Z M5,17 L19,17 L19,19 L5,19 L5,17 Z M11,14 L19,14 L19,16 L11,16 L11,14 Z M11,11 L19,11 L19,13 L11,13 L11,11 Z M5,5 L19,5 L19,7 L5,7 L5,5 Z M11,8 L19,8 L19,10 L11,10 L11,8 Z';
        },
    },
};
</script>
