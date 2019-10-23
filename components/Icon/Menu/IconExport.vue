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
    name: 'IconExport',
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
            default: 24,
        },
    },
    data() {
        return {
            drawingCommands: 'M20,8.92307692 L15.4285714,8.92307692 L15.4285714,2 L8.57142857,2 L8.57142857,8.92307692 L4,8.92307692 L12,17 L20,8.92307692 Z M4,20 L4,22 L20,22 L20,20 L4,20 Z',
        };
    },
};
</script>
