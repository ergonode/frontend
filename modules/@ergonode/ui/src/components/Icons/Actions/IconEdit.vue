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
    name: 'IconEdit',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M14,6 L10,6 L10,4 C10,3.44771525 10.4477153,3 11,3 L13,3 C13.5522847,3 14,3.44771525 14,4 L14,6 Z M14,8 L14,18.5 L12,21 L10,18.5 L10,8 L14,8 Z';
        },
        transform() {
            return 'translate(12, 12) rotate(-315) translate(-12, -12)';
        },
    },
};
</script>
