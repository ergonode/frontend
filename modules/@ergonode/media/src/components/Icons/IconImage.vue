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
    name: 'IconImage',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5,3 L19,3 C20.1045695,3 21,3.8954305 21,5 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,5 C3,3.8954305 3.8954305,3 5,3 Z M11,17.7583333 L8.5,15.25 L5,19 L19,19 L14.5,14 L11,17.7583333 Z M9,11 C10.1045695,11 11,10.1045695 11,9 C11,7.8954305 10.1045695,7 9,7 C7.8954305,7 7,7.8954305 7,9 C7,10.1045695 7.8954305,11 9,11 Z';
        },
    },
};
</script>
