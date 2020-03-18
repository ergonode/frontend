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
import BaseIcon from '@Core/components/Icons/BaseIcon';
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'IconAddColumn',
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
            drawingCommands: 'M24,0 L24,24 L14,24 L14,15 L16,15 L16,22 L22,22 L22,2 L16,2 L16,9 L14,9 L14,0 L24,0 Z M11,5 L11,11 L17,11 L17,13 L11,13 L11,19 L9,19 L9,13 L3,13 L3,11 L9,11 L9,5 L11,5 Z',
        };
    },
};
</script>
