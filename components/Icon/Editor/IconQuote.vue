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
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconQuote',
    components: {
        IconBase,
    },
    props: {
        fillColor: {
            type: String,
            default: GRAPHITE,
        },
        size: {
            type: [String, Number],
            default: '24',
        },
    },
    data() {
        return {
            drawingCommands: 'M5,13 L5,7 L11,7 L11,13 L9,17 L6,17 L8,13 L5,13 Z M13.0000067,7 L19.0000067,7 L19.0000067,13 L17.0000067,17 L14.0000067,17 L16.0000067,13 L13.0000067,13 L13.0000067,7 Z',
        };
    },
};
</script>
