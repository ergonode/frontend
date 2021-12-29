/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path
            :d="drawingCommands"
            :transform="transform" />
    </Icon>
</template>

<script>

export default {
    name: 'IconProcessing',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M4,12 C4,14.2 4.9,16.2 6.4,17.6 L4,20 L10,20 L10,14 L7.8,16.2 C6.7,15.2 6,13.7 6,12 C6,9.4 7.7,7.2 10,6.3 L10,4.3 C6.6,5.2 4,8.3 4,12 Z M20,4 L14,4 L14,10 L16.2,7.8 C17.3,8.8 18,10.3 18,12 C18,14.6 16.3,16.8 14,17.7 L14,19.8 C17.4,18.9 20,15.8 20,12.0999608 C20,9.89996078 19.1,7.89996078 17.6,6.49996078 L20,4 Z';
        },
        transform() {
            return 'translate(12, 12) rotate(-90) translate(-12, -12)';
        },
    },
};
</script>
