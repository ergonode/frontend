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
    name: 'IconBlockquote',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M5,13 L5,7 L11,7 L11,13 L9,17 L6,17 L8,13 L5,13 Z M13.0000067,7 L19.0000067,7 L19.0000067,13 L17.0000067,17 L14.0000067,17 L16.0000067,13 L13.0000067,13 L13.0000067,7 Z';
        },
    },
};
</script>
