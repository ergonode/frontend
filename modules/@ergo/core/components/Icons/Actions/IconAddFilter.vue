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
    name: 'IconAddFilter',
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
            drawingCommands: 'M8,5 L8,11 L14,11 L14,13 L8,13 L8,19 L6,19 L6,13 L0,13 L0,11 L6,11 L6,5 L8,5 Z M24,7 L24,17 L11,17 L11,15 L22,15 L22,9 L11,9 L11,7 L24,7 Z',
        };
    },
};
</script>
