/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseIcon
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </BaseIcon>
</template>

<script>
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import BaseIcon from '~/components/Icon/BaseIcon';

export default {
    name: 'IconFontSize',
    components: {
        BaseIcon,
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
            drawingCommands: 'M3,13 L3,10 L12,10 L12,13 L9,13 L9,19 L6,19 L6,13 L3,13 Z M10,5 L21,5 L21,8 L17,8 L17,19 L14,19 L14,8 L10,8 L10,5 Z',
        };
    },
};
</script>
