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
import BaseIcon from '~/components/Icon/BaseIcon';
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'IconDragDrop',
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
            drawingCommands: 'M8 0L5.33333 3.16533H7.28089V7.28089H5.33333H3.16533V5.33244L0 8L3.16533 10.6667V8.71911H5.33333H7.28089V8.88889V12.8347L5.33333 12.8356L8 16L10.6667 12.8347H8.71911V9.58933V8.71911H12.8347V10.6667L16 8L12.8347 5.33244V7.28089H8.71911V3.16533H10.6667L8 0Z',
        };
    },
};
</script>
