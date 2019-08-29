/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </IconBase>
</template>

<script>
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconFilters',
    components: {
        IconBase,
    },
    props: {
        fillColor: {
            type: String,
            default: '#5C5F65',
        },
        size: {
            type: [String, Number],
            default: 24,
        },
    },
    data() {
        return {
            drawingCommands: 'M9,20 L15,20 L15,17 L9,17 L9,20 Z M2,5 L2,8 L22,8 L22,5 L2,5 Z M5,14 L19,14 L19,11 L5,11 L5,14 Z',
        };
    },
};
</script>
