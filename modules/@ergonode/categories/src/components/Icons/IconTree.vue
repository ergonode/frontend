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
    name: 'IconTree',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M8,18 L13,18 L13,17 C13,16.4477153 13.4477153,16 14,16 L20,16 C20.5522847,16 21,16.4477153 21,17 L21,21 C21,21.5522847 20.5522847,22 20,22 L14,22 C13.4477153,22 13,21.5522847 13,21 L13,20 L8,20 L8,23 L6,23 L6,7 L4,7 C3.44771525,7 3,6.55228475 3,6 L3,2 C3,1.44771525 3.44771525,1 4,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,6 C11,6.55228475 10.5522847,7 10,7 L8,7 L8,10 L13,10 L13,9 C13,8.44771525 13.4477153,8 14,8 L20,8 C20.5522847,8 21,8.44771525 21,9 L21,13 C21,13.5522847 20.5522847,14 20,14 L14,14 C13.4477153,14 13,13.5522847 13,13 L13,12 L8,12 L8,18 Z';
        },
    },
};
</script>
