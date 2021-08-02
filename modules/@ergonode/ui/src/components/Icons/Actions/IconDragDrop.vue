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
    name: 'IconDragDrop',
    computed: {
        drawingCommands() {
            return 'M12 4L9.33333 7.16533H11.2809V11.2809H9.33333H7.16533V9.33244L4 12L7.16533 14.6667V12.7191H9.33333H11.2809V12.8889V16.8347L9.33333 16.8356L12 20L14.6667 16.8347H12.7191V13.5893V12.7191H16.8347V14.6667L20 12L16.8347 9.33244V11.2809H12.7191V7.16533H14.6667L12 4Z';
        },
    },
};
</script>
