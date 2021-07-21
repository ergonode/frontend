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
    name: 'IconDate',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M9,10 L7,10 L7,12 L9,12 L9,10 L9,10 Z M13,10 L11,10 L11,12 L13,12 L13,10 L13,10 Z M17,10 L15,10 L15,12 L17,12 L17,10 L17,10 Z M19,3 L18,3 L18,1 L16,1 L16,3 L8,3 L8,1 L6,1 L6,3 L5,3 C3.89,3 3.01,3.9 3.01,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 L19,3 Z M19,19 L5,19 L5,8 L19,8 L19,19 L19,19 Z';
        },
    },
};
</script>
