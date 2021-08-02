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
    name: 'IconSync',
    inheritAttrs: false,
    computed: {
        drawingCommands1() {
            return 'M11.9999 5.80005C8.74182 5.80005 6.09041 8.38587 5.985 11.6182H3.51709L6.909 15.0101L10.3009 11.6182H7.841C7.94527 9.41074 9.76651 7.6546 11.9999 7.6546C12.704 7.6546 13.3632 7.83137 13.9471 8.13723L14.0773 8.20546L15.4209 6.86189L15.2077 6.72864C14.2762 6.14643 13.1816 5.80005 11.9999 5.80005Z';
        },
        drawingCommands2() {
            return 'M20.4826 12.0182L17.0907 8.62626L13.6988 12.0182H16.1587C16.0544 14.2256 14.2332 15.9818 11.9998 15.9818C11.2957 15.9818 10.6365 15.805 10.0526 15.4992L9.92236 15.4309L8.57878 16.7745L8.79198 16.9077C9.72347 17.4899 10.8181 17.8363 11.9998 17.8363C15.2578 17.8363 17.9093 15.2505 18.0147 12.0182H20.4826Z';
        },
    },
};
</script>
