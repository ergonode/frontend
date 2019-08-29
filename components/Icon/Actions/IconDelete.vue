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
    name: 'IconDelete',
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
            default: '24',
        },
    },
    data() {
        return {
            drawingCommands: 'M8.81818182,19 L15.1818182,19 C16.25,19 17,18.1514286 17,16.8 L17,8 L7,8 L7,16.8 C7,18.1514286 7.75,19 8.81818182,19 Z M16,6 L14,5 L10,5 L8,6 L6,6 L6,7 L18,7 L18,6 L16,6 Z',
        };
    },
};
</script>
