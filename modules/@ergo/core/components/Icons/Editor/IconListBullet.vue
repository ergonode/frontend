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
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconListBullet',
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
            drawingCommands: 'M4,5 L6,5 L6,7 L4,7 L4,5 Z M4,11 L6,11 L6,13 L4,13 L4,11 Z M4,17 L6,17 L6,19 L4,19 L4,17 Z M8,17 L21,17 L21,19 L8,19 L8,17 Z M8,5 L21,5 L21,7 L8,7 L8,5 Z M8,11 L21,11 L21,13 L8,13 L8,11 Z',
        };
    },
};
</script>
