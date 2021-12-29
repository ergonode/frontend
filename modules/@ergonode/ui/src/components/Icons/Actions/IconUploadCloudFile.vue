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
    name: 'IconUploadCloudFile',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M38.8,12 C37.4,5.2 31.4,0 24,0 C18.2,0 13.2,3.2 10.8,8 C4.6,8.8 0,13.8 0,20 C0,26.6 5.4,32 12,32 L38,32 C43.6,32 48,27.6 48,22 C48,16.8 43.8,12.4 38.8,12 Z M28,18 L28,26 L20,26 L20,18 L14,18 L24,8 L34,18 L28,18 Z';
        },
    },
};
</script>
