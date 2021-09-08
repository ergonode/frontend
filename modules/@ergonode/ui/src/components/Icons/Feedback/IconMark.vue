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
import Icon from '@UI/components/Icons/Icon';

export default {
    name: 'IconMark',
    components: {
        Icon,
    },
    computed: {
        drawingCommands() {
            return 'M10.476 16L6.6665 12.1538L7.73317 11.0769L10.476 13.8462L16.2665 8L17.3332 9.07692L10.476 16Z';
        },
    },
};
</script>
