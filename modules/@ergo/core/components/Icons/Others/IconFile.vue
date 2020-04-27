/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands" />
    </Icon>
</template>

<script>
import Icon from '@Core/components/Icons/Icon';

export default {
    name: 'IconFile',
    components: {
        Icon,
    },
    computed: {
        drawingCommands() {
            return 'M15 1H27L36 10V28C36 29.65 34.65 31 33 31H14.985C13.335 31 12 29.65 12 28L12.015 4C12.015 2.35 13.35 1 15 1ZM17.9999 25H29.9999V22H17.9999V25ZM29.9999 19H17.9999V16H29.9999V19ZM25.4999 3.24999V11.5H33.7499L25.4999 3.24999Z';
        },
    },
};
</script>
