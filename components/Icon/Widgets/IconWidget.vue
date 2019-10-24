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
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'IconWidget',
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
            drawingCommands: 'M13,21 L13,15 L21,15 L21,21 L13,21 Z M3,21 L3,19 L11,19 L11,21 L3,21 Z M3,13 L3,7 L21,7 L21,13 L3,13 Z M3,17 L3,15 L11,15 L11,17 L3,17 Z M3,3 L11,3 L11,5 L3,5 L3,3 Z M13,3 L21,3 L21,5 L13,5 L13,3 Z',
        };
    },
};
</script>
