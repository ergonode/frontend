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
    name: 'IconUnderline',
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
            drawingCommands: 'M12,16 C9.2375,16 7,13.698574 7,11 L7,4 L9,4 L9,11 C9.08332031,12.5157182 10.3875,13.8571586 12,14 C13.6125,13.8571586 14.9166797,12.5157182 15,11 L15,4 L17,4 L17,11 C17,13.698574 14.7625,16 12,16 Z M5,18 L19,18 L19,20 L5,20 L5,18 Z',
        };
    },
};
</script>
