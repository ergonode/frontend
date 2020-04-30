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
    name: 'IconUnderline',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M17 11C17 13.6986 14.7625 16 12 16C9.2375 16 7 13.6986 7 11V4H9V11C9.08332 12.5157 10.3875 13.8572 12 14C13.6125 13.8572 14.9167 12.5157 15 11V4H17V11ZM19 20V18H5V20H19Z';
        },
    },
};
</script>
