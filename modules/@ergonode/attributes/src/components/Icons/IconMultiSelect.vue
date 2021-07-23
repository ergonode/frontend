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
    name: 'IconMultiSelect',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M19,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.11,21 21,20.1 21,19 L21,5 C21,3.9 20.11,3 19,3 L19,3 Z M10,17 L5,12 L6.41,10.59 L10,14.17 L17.59,6.58 L19,8 L10,17 L10,17 Z';
        },
    },
};
</script>
