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
    name: 'Icon',
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
            drawingCommands: 'M17.4444323,5 L6.55556771,5 C5.69609896,5 5,5.69609896 5,6.55556771 L5,17.4444687 C5,18.303901 5.69609896,19 6.55556771,19 L17.4444687,19 C18.303901,19 19,18.303901 19,17.4444323 L19,6.55556771 C19,5.69609896 18.303901,5 17.4444323,5 Z M6.55556771,16.6666667 L9.27780208,13.1666667 L11.2222344,15.503901 L13.9444323,12 L17.4444323,16.6666667 L6.55556771,16.6666667 Z',
        };
    },
};
</script>
