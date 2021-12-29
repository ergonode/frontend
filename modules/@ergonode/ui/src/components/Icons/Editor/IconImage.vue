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
    name: 'Icon',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M17.4444323,5 L6.55556771,5 C5.69609896,5 5,5.69609896 5,6.55556771 L5,17.4444687 C5,18.303901 5.69609896,19 6.55556771,19 L17.4444687,19 C18.303901,19 19,18.303901 19,17.4444323 L19,6.55556771 C19,5.69609896 18.303901,5 17.4444323,5 Z M6.55556771,16.6666667 L9.27780208,13.1666667 L11.2222344,15.503901 L13.9444323,12 L17.4444323,16.6666667 L6.55556771,16.6666667 Z';
        },
    },
};
</script>
