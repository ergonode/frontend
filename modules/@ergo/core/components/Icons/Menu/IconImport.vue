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
import { GRAPHITE } from '@Core/assets/scss/_variables/_colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconImport',
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
            default: 24,
        },
    },
    data() {
        return {
            drawingCommands: 'M20,10.0769231 L15.4285714,10.0769231 L15.4285714,17 L8.57142857,17 L8.57142857,10.0769231 L4,10.0769231 L12,2 L20,10.0769231 Z M4,20 L4,22 L20,22 L20,20 L4,20 Z',
        };
    },
};
</script>
