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
    name: 'IconRefresh',
    computed: {
        drawingCommands() {
            return 'M8 12V0L12.9999 4.8C15.7999 1.8 19.7999 0 24.1999 0C31.6 0 37.8 5.2 39.6 12L35.4 12C33.6 7.4 29.2 4 24 4C20.6 4 17.6 5.4 15.6 7.6L20 12H8ZM35.2003 27.2C32.4003 30.2 28.4003 32 24.0003 32C16.6003 32 10.4003 26.8 8.60026 20H12.6003C14.4003 24.6 18.8003 28 24.0003 28C27.4003 28 30.4003 26.6 32.4003 24.4L28.0003 20H40.0003V32L35.2003 27.2Z';
        },
    },
};
</script>

<style lang="scss" scoped>
    svg {
        animation: rotate 2s linear infinite;
    }

    @keyframes rotate {
        to {
            transform: rotate(-360deg);
        }
    }
</style>
