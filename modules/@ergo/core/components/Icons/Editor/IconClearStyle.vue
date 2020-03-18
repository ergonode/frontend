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
    name: 'IconClearStyle',
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
            drawingCommands: 'M5,5 L18,19 L17,20 L12,15 L10,19 L7,19 L10,13 L4,6 L5,5 Z M8,5 L20,5 L20,8 L15,8 L14,11 L12,9 L12,8 L10,8 L8,5 Z',
        };
    },
};
</script>
