/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands1" />
        <path :d="drawingCommands2" />
    </Icon>
</template>

<script>

export default {
    name: 'IconHeadingTwo',
    inheritAttrs: false,
    computed: {
        drawingCommands1() {
            return 'M14 17L21 16.9999V15H17L18.5689 13.7137C20.6619 11.8046 21.2237 10.85 21.2237 9.69165C21.2237 7.92673 19.782 6.67886 17.5994 6.67886C15.4616 6.67886 13.995 8.00145 14 10H16C15.995 9.0256 16.6548 8.38412 17.5845 8.38412C18.4794 8.38412 19.1456 8.94094 19.1456 9.83582C19.1456 10.6462 18.6484 11.203 17.7237 12.0929L14 15V17Z';
        },
        drawingCommands2() {
            return 'M3 17L5 16.9999V12.9999H10V16.9999H12V6.99994H10V11.0192H5V6.99994H3V17Z';
        },
    },
};
</script>
