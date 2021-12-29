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
    name: 'IconCancel',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M12 4C7.576 4 4 7.576 4 12C4 16.424 7.576 20 12 20C16.424 20 20 16.424 20 12C20 7.576 16.424 4 12 4ZM16 14.872L14.872 16L12 13.128L9.128 16L8 14.872L10.872 12L8 9.128L9.128 8L12 10.872L14.872 8L16 9.128L13.128 12L16 14.872Z';
        },
    },
};
</script>
